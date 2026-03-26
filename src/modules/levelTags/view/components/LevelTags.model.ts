import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { LevelTagBindingData } from '@/modules/levelTags/model/entities/types';
import { LevelTagsActions, LevelTagsDataAccess, LevelTagsActionsInjectKey, LevelTagsDataAccessInjectKey } from '@/modules/levelTags/model/services';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import { getLevelTagColumns } from '../utils/columns';
import { getLevelTagsToolbarItems } from '../utils/toolbarItems';
import type { LevelTagsProps } from './LevelTags';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import TagsApi from '@common/api/tags/api';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import type { Tag } from '@common/api/tags/types';
import type { ListItemOptions } from '@ui/Select/common/types';
import type { RowType } from '@common/store/entity/EntityManager';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import type { LevelTagCreateFormState } from '../utils/toolbarItems';

class LevelTagsGridModel extends ViewModel<LevelTagsProps> {

  @State()
  public selectedRows: TreeNode<LevelTagBindingData>[] = [];

  @State()
  public selectedRowId: string | number  = null;

  @State()
  public tags: Tag[] = [];

  @State()
  public createForm: LevelTagCreateFormState = {};

  @Computed()
  public get tagOptions(): ListItemOptions[] {
    return this.tags.map(t => ({
      label: t.name,
      value: t.id,
    }));
  }

  @Computed()
  public get columnSearchColumns(): Array<{ value: string; label: string }> {
    return [
      { value: 'tag', label: 'Тег' },
      { value: 'level', label: 'Карта' },
      { value: 'user', label: 'Пользователь' },
    ];
  }

  private contentManagerRef: ContentManagerRef  = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  }

  constructor(
    @inject(LevelTagsDataAccessInjectKey) public dataAccess: LevelTagsDataAccess,
    @inject(LevelTagsActionsInjectKey) public actions: LevelTagsActions,
    @inject(TagsApiInjectKey) private tagsApi: TagsApi
  ) {
    super();
  }

  @OnMounted()
  public async initialize(): Promise<void> {
    const response = await this.tagsApi.collect();
    const result: Tag[] = [];
    const walk = (items: Tag[]): void => {
      items.forEach(t => {
        result.push(t);
        walk(t.childs);
      });
    };
    walk(response);
    this.tags = result;
  }

  public onPageLoad = async (page: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
    const query = this.dataAccess.filterSearchText;

    const result = await this.actions.loadPage(page, pageSize, {
      query,
      levelId: this.dataAccess.filterLevelId,
      tagId: this.dataAccess.filterTagId,
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
  }

  @Computed()
  public get pageTitle(): string {
    return 'Управление привязками тегов';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<LevelTagBindingData>>[] {
    return getLevelTagColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getLevelTagsToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleFilterSearchTextChange.bind(this),
      selectedRows: this.selectedRows,
      onCreate: this.handleCreateBinding.bind(this),
      onDelete: this.handleDelete.bind(this),
      formState: this.createForm,
      tagOptions: this.tagOptions,
      onFormTagChange: this.handleFormTagChange.bind(this),
      onFormLevelChange: this.handleFormLevelChange.bind(this),
      onFormUserChange: this.handleFormUserChange.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
    });
  }

  @Action()
  public handleFormTagChange = (option: ListItemOptions): void => {
    this.createForm.tagId = option.value;
  }

  @Action()
  public handleFormLevelChange = (levelId: number): void => {
    this.createForm.levelId = levelId;
  }

  @Action()
  public handleFormUserChange = (userId: number): void => {
    this.createForm.userId = userId;
  }

  @Action()
  public handleFormCancel = (): void => {
    this.createForm = {};
  }

  @AsyncAction()
  public async handleCreateBinding(): Promise<void> {
    const { tagId, levelId, userId } = this.createForm;
    if (!tagId || !levelId) {
      Notification.warning('Предупреждение', 'Укажите тег и карту');
      return;
    }

    await this.actions.create({
      tagId,
      levelId,
      userId,
    });

    Notification.success('Успех', 'Привязка добавлена');
    this.handleFormCancel();
    await this.contentManagerRef?.reloadData();
  }

  @AsyncAction()
  public async performDelete(rows: TreeNode<LevelTagBindingData>[]): Promise<void> {
    await Promise.all(rows.map(r => this.actions.delete({ id: r.data.id })));
    Notification.success('Успех', 'Привязки удалены');
    await this.contentManagerRef?.reloadData();
  }

  public async handleDelete(rows: TreeNode<LevelTagBindingData>[]): Promise<void> {
    if (!rows || !rows.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одной привязки');
      return;
    }

    const count = rows.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранную привязку?'
      : `Вы уверены, что хотите удалить ${count} привяз(ок)?`;

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
  }

  @Action()
  public handleFilterSelectedColumnsChange = (columns: string[]): void => {
    this.dataAccess.setFilterSelectedColumns(columns);
  }

  @Action()
  public handleFilterLevelChange = (levelId: number): void => {
    this.dataAccess.setFilterLevelId(levelId);
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterLevelSelectChange = (levelId: number): void => {
    this.handleFilterLevelChange(levelId);
  }

  @Action()
  public handleFilterUserChange = (userId: number): void => {
    this.dataAccess.setFilterUserId(userId);
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterTagChange = (tagId: number): void => {
    this.dataAccess.setFilterTagId(tagId);
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterTagOptionChange = (option: ListItemOptions): void => {
    this.handleFilterTagChange(option.value);
  }

  @Computed()
  public get collection(): LevelTagBindingData[] {
    return this.dataAccess.entityManager.getCollection;
  }

  public entityToTreeNode = (row: LevelTagBindingData): TreeNode<LevelTagBindingData> => {
    console.log(row)
    return { id: row.id, data: row };
  }

  @Action()
  public handleRowSelect = (row: TreeNode<LevelTagBindingData> ): void => {
    this.selectedRowId = row ? row.id : null;
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<LevelTagBindingData>[]): void => {
    this.selectedRows = rows;
  }

  public handleCellEdit = async (rowId: RowType, columnId: string, value: unknown, rowData: LevelTagBindingData): Promise<void> => {
    const id = Number(rowId);

    if (columnId === 'tag') {
      const nextName = String(value).trim();
      if (!rowData.tag?.id || !nextName) {
        return;
      }

      const updated = await this.tagsApi.update({ id: rowData.tag.id, name: nextName });
      this.dataAccess.update(id, { tag: { ...rowData.tag, name: updated.name } });
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
  }
}

export default LevelTagsGridModel;
