import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Favorite } from '@common/api/favorites/models';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { getFavoritesColumns } from '../utils/columns';
import { FavoritesActions, FavoritesDataAccess, FavoritesActionsInjectKey, FavoritesDataAccessInjectKey } from '@/modules/favorites/model/services';
import UserFavoriteForm from '@/modules/users/modules/favorites/view/components/UserFavoriteForm';

import type { FavoritesProps } from './Favorites';
import { getFavoritesToolbarItems } from "@/modules/favorites/view/utils/toolbarItems";

class FavoritesModel extends ViewModel<FavoritesProps> {
  @State()
  public selectedRows: TreeNode<Favorite>[] = [];

  @State()
  public selectedRowId: string | number = null;

  @State()
  public createForm: { userId?: number; levelId?: number } = {};

  private contentManagerRef: ContentManagerRef = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(FavoritesDataAccessInjectKey) public dataAccess: FavoritesDataAccess,
    @inject(FavoritesActionsInjectKey) public actions: FavoritesActions,
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
    return 'Управление избранными картами';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<Favorite>>[] {
    return getFavoritesColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getFavoritesToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleFilterSearchTextChange.bind(this),
      selectedRows: this.selectedRows,
      onDelete: this.handleDelete.bind(this),
      formState: this.createForm,
      onFormUserChange: this.handleFormUserChange.bind(this),
      onFormLevelChange: this.handleFormLevelChange.bind(this),
      onCreate: this.handleCreateFavorite.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      FormComponent: UserFavoriteForm,
    });
  }

  @Action()
  public handleFormUserChange = (userId: number ): void => {
    this.createForm.userId = userId;
  }

  @Action()
  public handleFormLevelChange = (levelId: number ): void => {
    this.createForm.levelId = levelId;
  }

  @Action()
  public handleFormCancel = (): void => {
    this.createForm.userId = undefined;
    this.createForm.levelId = undefined;
  }

  @AsyncAction()
  public async handleCreateFavorite(): Promise<void> {
    const userId = this.createForm.userId;
    const levelId = this.createForm.levelId;

    if (!userId) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    if (!levelId) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    try {
      await this.actions.create({ userId, levelId });
      Notification.success('Успех', 'Добавлено в избранное');
      this.handleFormCancel();
      await this.contentManagerRef?.reloadData();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить в избранное');
    }
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
  public get collection(): Favorite[] {
    return this.dataAccess.entityManager.getCollection;
  }

  public entityToTreeNode = (row: Favorite): TreeNode<Favorite> => {
    return { id: row.id, data: row };
  };

  @Action()
  public handleRowSelect = (row: TreeNode<Favorite> | null): void => {
    this.selectedRowId = row ? row.id : null;
  };

  @Action()
  public handleRowCheck = (rows: TreeNode<Favorite>[]): void => {
    this.selectedRows = rows;
  };

  @AsyncAction()
  public async performDelete(rows: TreeNode<Favorite>[]): Promise<void> {
    const ids = rows.map(r => r.data.id);
    await this.actions.deleteBulk(ids);
    Notification.success('Успех', 'Избранные удалены');
    await this.contentManagerRef?.reloadData();
  }

  public async handleDelete(rows: TreeNode<Favorite>[]): Promise<void> {
    if (!rows || !rows.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного элемента');
      return;
    }

    const count = rows.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранное избранное?'
      : `Вы уверены, что хотите удалить ${count} элементов из избранного?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(rows),
    });
  }

  public handleCellEdit = async (rowId: number, columnId: string, value: unknown, rowData: Favorite): Promise<void> => {
    const id = Number(rowId);

    if (columnId === 'description') {
      const nextText = String(value ).trim();
      await this.actions.update({ id, description: nextText });
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

export default FavoritesModel;
