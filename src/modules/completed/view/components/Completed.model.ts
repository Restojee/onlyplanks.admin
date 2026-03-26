import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Completed } from '@common/api/completed/models';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { getCompletedColumns } from '../utils/columns';
import { getCompletedToolbarItems, type CompletedCreateFormState } from '../utils/toolbarItems';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';
import { CompletedActions, CompletedDataAccess, CompletedActionsInjectKey, CompletedDataAccessInjectKey } from '@/modules/completed/model/services';

import type { CompletedProps } from './Completed';

export interface CompletedPageProps {
  viewModel: CompletedGridModel;
}

class CompletedGridModel extends ViewModel<CompletedProps> {
  @State()
  public selectedRows: TreeNode<Completed>[] = [];

  @State()
  public selectedRowId: string | number = null;

  @State()
  public createForm: CompletedCreateFormState = {};

  private contentManagerRef: ContentManagerRef = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(CompletedDataAccessInjectKey) public dataAccess: CompletedDataAccess,
    @inject(CompletedActionsInjectKey) public actions: CompletedActions,
    @inject(HttpConfigInjectKey) private httpConfig: HttpConfig,
  ) {
    super();
  }

  public onPageLoad = async (page: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
    const result = await this.actions.loadPage(page, pageSize, {
      query: this.dataAccess.filterSearchText,
      levelId: this.dataAccess.filterLevelId,
      userId: this.dataAccess.filterUserId,
      sortField,
      sortDirection,
    });

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      pageSize: result.pageSize,
      page: result.page,
      data: result.rows,
    };
  };

  @Computed()
  public get pageTitle(): string {
    return 'Управление выполненными уровнями';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<Completed>>[] {
    return getCompletedColumns({
      storageUrl: this.httpConfig.getConfig().storageUrl,
    });
  }

  @Computed()
  public get getToolbarItems() {
    return getCompletedToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleFilterSearchTextChange.bind(this),
      selectedRows: this.selectedRows,
      onCreate: this.handleCreateCompleted.bind(this),
      onDelete: this.handleDelete.bind(this),
      formState: this.createForm,
      onFormUserChange: this.handleFormUserChange.bind(this),
      onFormLevelChange: this.handleFormLevelChange.bind(this),
      onFormDescriptionChange: this.handleFormDescriptionChange.bind(this),
      onFormImageChange: this.handleFormImageChange.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
    });
  }

  @Action()
  public handleFormUserChange = (userId: number): void => {
    this.createForm.userId = userId;
  }

  @Action()
  public handleFormLevelChange = (levelId: number): void => {
    this.createForm.levelId = levelId;
  }

  @Action()
  public handleFormDescriptionChange = (description: string): void => {
    this.createForm.description = description;
  }

  @Action()
  public handleFormImageChange = (image: File): void => {
    this.createForm.image = image;
  }

  @Action()
  public handleFormCancel = (): void => {
    this.createForm = {};
  }

  @AsyncAction()
  public async handleCreateCompleted(): Promise<void> {
    const { userId, levelId, description, image } = this.createForm;

    if (!userId || !levelId) {
      Notification.warning('Предупреждение', 'Укажите пользователя и уровень');
      return;
    }

    const nextDescription = String(description ).trim();
    if (!nextDescription) {
      Notification.warning('Предупреждение', 'Введите описание');
      return;
    }

    if (!image) {
      Notification.warning('Предупреждение', 'Загрузите изображение');
      return;
    }

    await this.actions.create({
      userId,
      levelId,
      description: nextDescription,
      image,
    });

    Notification.success('Успех', 'Выполнение добавлено');
    this.handleFormCancel();
    await this.contentManagerRef?.reloadData();
  }

  @AsyncAction()
  public async performDelete(rows: TreeNode<Completed>[]): Promise<void> {
    const ids = rows.map(r => r.data.id);
    await this.actions.deleteBulk(ids);
    Notification.success('Успех', 'Выполнения удалены');
    await this.contentManagerRef?.reloadData();
  }

  public async handleDelete(rows: TreeNode<Completed>[]): Promise<void> {
    if (!rows || !rows.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного выполнения');
      return;
    }

    const count = rows.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранное выполнение?'
      : `Вы уверены, что хотите удалить ${count} выполнений?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(rows),
    });
  }

  @Action()
  public handleFilterSearchTextChange = (text: string): void => {
    this.dataAccess.setFilterSearchText(text);
    this.contentManagerRef?.reloadData();
  };

  @Action()
  public handleFilterLevelChange = (levelId: number ): void => {
    this.dataAccess.setFilterLevelId(levelId);
    this.contentManagerRef?.reloadData();
  };

  @Action()
  public handleFilterUserChange = (userId: number ): void => {
    this.dataAccess.setFilterUserId(userId);
    this.contentManagerRef?.reloadData();
  };

  @Computed()
  public get collection(): Completed[] {
    return this.dataAccess.entityManager.getCollection;
  }

  public entityToTreeNode = (row: Completed): TreeNode<Completed> => {
    return { id: row.id, data: row };
  };

  @Action()
  public handleRowSelect = (row: TreeNode<Completed> | null): void => {
    this.selectedRowId = row ? row.id : null;
  };

  @Action()
  public handleRowCheck = (rows: TreeNode<Completed>[]): void => {
    this.selectedRows = rows;
  };

  public handleCellEdit = async (rowId: number, columnId: string, value: unknown, rowData: Completed): Promise<void> => {
    const id = Number(rowId);

    if (columnId === 'description') {
      const nextText = String(value ).trim();
      await this.actions.update({ id, description: nextText });
      await this.contentManagerRef?.reloadData();
      return;
    }

    if (columnId === 'image') {
      const file = value as File;
      if (!file) return;
      await this.actions.updateImage({ id, image: file });
      await this.contentManagerRef?.reloadData();
      return;
    }

    if (columnId === 'user') {
      const userId = value === undefined || value === null ? undefined : Number(value);
      if (!userId) return;
      await this.actions.update({ id, userId });
      await this.contentManagerRef?.reloadData();
      return;
    }

    if (columnId === 'level') {
      const levelId = value === undefined || value === null ? undefined : Number(value);
      if (!levelId) return;
      await this.actions.update({ id, levelId });
      await this.contentManagerRef?.reloadData();
      return;
    }
  };
}

export default CompletedGridModel;
