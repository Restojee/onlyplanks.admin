import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Note } from '@common/api/notes/models';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { getNotesColumns } from '../utils/columns';
import { getNotesToolbarItems } from '../utils/toolbarItems';
import { NotesActions, NotesDataAccess, NotesActionsInjectKey, NotesDataAccessInjectKey } from '@/modules/notes/model/services';

import type { NotesProps } from './Notes';

class NotesModel extends ViewModel<NotesProps> {
  @State()
  public selectedRows: TreeNode<Note>[] = [];

  @State()
  public selectedRowId: string | number = null;

  @State()
  public createForm: { userId?: number; levelId?: number; description?: string } = {};

  private contentManagerRef: ContentManagerRef = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(NotesDataAccessInjectKey) public dataAccess: NotesDataAccess,
    @inject(NotesActionsInjectKey) public actions: NotesActions,
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
    return 'Управление заметками';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<Note>>[] {
    return getNotesColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getNotesToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleFilterSearchTextChange.bind(this),
      selectedRows: this.selectedRows,
      onDelete: this.handleDelete.bind(this),
      formState: this.createForm,
      onFormUserChange: this.handleFormUserChange.bind(this),
      onFormLevelChange: this.handleFormLevelChange.bind(this),
      onFormDescriptionChange: this.handleFormDescriptionChange.bind(this),
      onCreate: this.handleCreateNote.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
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
  public handleFormDescriptionChange = (description: string ): void => {
    this.createForm.description = description;
  }

  @Action()
  public handleFormCancel = (): void => {
    this.createForm.userId = undefined;
    this.createForm.levelId = undefined;
    this.createForm.description = undefined;
  }

  @AsyncAction()
  public async handleCreateNote(): Promise<void> {
    const userId = this.createForm.userId;
    const levelId = this.createForm.levelId;
    const description = String(this.createForm.description ).trim();

    if (!userId) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    if (!levelId) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    if (!description) {
      Notification.warning('Предупреждение', 'Введите описание');
      return;
    }

    try {
      await this.actions.create({ userId, levelId, description });
      Notification.success('Успех', 'Заметка добавлена');
      this.handleFormCancel();
      await this.contentManagerRef?.reloadData();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить заметку');
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
  public get collection(): Note[] {
    return this.dataAccess.entityManager.getCollection;
  }

  public entityToTreeNode = (row: Note): TreeNode<Note> => {
    return { id: row.id, data: row };
  };

  @Action()
  public handleRowSelect = (row: TreeNode<Note> | null): void => {
    this.selectedRowId = row ? row.id : null;
  };

  @Action()
  public handleRowCheck = (rows: TreeNode<Note>[]): void => {
    this.selectedRows = rows;
  };

  @AsyncAction()
  public async performDelete(rows: TreeNode<Note>[]): Promise<void> {
    const ids = rows.map(r => r.data.id);
    await this.actions.deleteBulk(ids);
    Notification.success('Успех', 'Заметки удалены');
    await this.contentManagerRef?.reloadData();
  }

  public async handleDelete(rows: TreeNode<Note>[]): Promise<void> {
    if (!rows || !rows.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного элемента');
      return;
    }

    const count = rows.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранную заметку?'
      : `Вы уверены, что хотите удалить ${count} заметок?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(rows),
    });
  }

  public handleCellEdit = async (rowId: number, columnId: string, value: unknown, rowData: Note): Promise<void> => {
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

export default NotesModel;
