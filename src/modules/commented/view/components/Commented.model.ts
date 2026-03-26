import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { CommentRow } from '@common/api/comments/models';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import { CommentedActions, CommentedDataAccess, CommentedActionsInjectKey, CommentedDataAccessInjectKey } from '@/modules/commented/model/services';
import { getCommentedColumns } from '../utils/columns';
import { getCommentedToolbarItems } from '../utils/toolbarItems';
import type { CommentedProps } from './Commented';

export type CommentCreateFormState = {
  levelId?: number;
  userId?: number;
  text?: string;
};

class CommentedGridModel extends ViewModel<CommentedProps> {

  @State()
  public selectedRows: TreeNode<CommentRow>[] = [];

  @State()
  public selectedRowId: string | number = null;

  @State()
  public createForm: CommentCreateFormState = {};

  private contentManagerRef: ContentManagerRef = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(CommentedDataAccessInjectKey) public dataAccess: CommentedDataAccess,
    @inject(CommentedActionsInjectKey) public actions: CommentedActions,
    @inject(AppServiceInjectKey) private appService: AppService,
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
    return 'Управление комментариями';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<CommentRow>>[] {
    return getCommentedColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getCommentedToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleFilterSearchTextChange.bind(this),
      selectedRows: this.selectedRows,
      onCreate: this.handleCreateComment.bind(this),
      onDelete: this.handleDelete.bind(this),
      formState: this.createForm,
      onFormLevelChange: this.handleFormLevelChange.bind(this),
      onFormUserChange: this.handleFormUserChange.bind(this),
      onFormTextChange: this.handleFormTextChange.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
    });
  }

  @Action()
  public handleFormLevelChange = (levelId: number): void => {
    this.createForm.levelId = levelId;
  };

  @Action()
  public handleFormUserChange = (userId: number): void => {
    this.createForm.userId = userId;
  };

  @Action()
  public handleFormTextChange = (text: string): void => {
    this.createForm.text = text;
  };

  @Action()
  public handleFormCancel = (): void => {
    this.createForm = {};
  };

  @AsyncAction()
  public async handleCreateComment(): Promise<void> {
    const { levelId, userId, text } = this.createForm;

    if (!levelId || !userId) {
      Notification.warning('Предупреждение', 'Укажите уровень и пользователя');
      return;
    }

    const nextText = String(text ).trim();
    if (!nextText) {
      Notification.warning('Предупреждение', 'Введите текст комментария');
      return;
    }

    await this.actions.create({ levelId, userId, text: nextText });
    Notification.success('Успех', 'Комментарий добавлен');
    this.handleFormCancel();
    await this.contentManagerRef?.reloadData();
  }

  @AsyncAction()
  public async performDelete(rows: TreeNode<CommentRow>[]): Promise<void> {
    const ids = rows.map(r => r.data.id);
    await this.actions.deleteBulk(ids);
    Notification.success('Успех', 'Комментарии удалены');
    await this.contentManagerRef?.reloadData();
  }

  public async handleDelete(rows: TreeNode<CommentRow>[]): Promise<void> {
    if (!rows || !rows.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного комментария');
      return;
    }

    const count = rows.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранный комментарий?'
      : `Вы уверены, что хотите удалить ${count} комментариев?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(rows)
    });
  }

  @Action()
  public handleFilterSearchTextChange = (text: string): void => {
    this.dataAccess.setFilterSearchText(text);
    this.contentManagerRef?.reloadData();
  };

  @Action()
  public handleFilterLevelChange = (levelId: number): void => {
    this.dataAccess.setFilterLevelId(levelId);
    this.contentManagerRef?.reloadData();
  };

  @Action()
  public handleFilterUserChange = (userId: number): void => {
    this.dataAccess.setFilterUserId(userId);
    this.contentManagerRef?.reloadData();
  };

  @Computed()
  public get collection(): CommentRow[] {
    return this.dataAccess.entityManager.getCollection;
  }

  public entityToTreeNode = (row: CommentRow): TreeNode<CommentRow> => {
    return { id: row.id, data: row };
  };

  @Action()
  public handleRowSelect = (row: TreeNode<CommentRow> | null): void => {
    this.selectedRowId = row ? row.id : null;
  };

  @Action()
  public handleRowCheck = (rows: TreeNode<CommentRow>[]): void => {
    this.selectedRows = rows;
  };

  public handleCellEdit = async (rowId: number, columnId: string, value: unknown, rowData: CommentRow): Promise<void> => {
    const id = Number(rowId);

    if (columnId === 'text') {
      const nextText = String(value ).trim();
      await this.actions.update({ id, text: nextText });
      return;
    }

    if (columnId === 'level') {
      await this.actions.update({ id, levelId: Number(value) });
      return;
    }

    if (columnId === 'user') {
      await this.actions.update({ id, userId: Number(value) });
      return;
    }
  };
}

export default CommentedGridModel;
