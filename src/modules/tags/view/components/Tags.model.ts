import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, OnUnmounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { TagDataAccess, TagActions, TagDataAccessInjectKey, TagActionsInjectKey } from '@/modules/tags/model/services';
import { createTagsToolbarItems, getTagColumns } from '@/modules/tags/view/utils';
import type { TagData, TagFormData } from '@/modules/tags/model/entities';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import type { TreeNode } from '@ui/DataTreeTable';
import { TagsProps } from '@/modules/tags/view/components/Tags';
import { ColumnDef } from '@tanstack/react-table';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';

class TagsModel extends ViewModel<TagsProps> {

  @State()
  public title = 'Управление тегами';

  @State()
  public selectedRows: TreeNode<TagData>[] = [];

  @State()
  public selectedRowId: string | number  = null;

  @State()
  public searchQuery: string = '';

  constructor(
    @inject(TagDataAccessInjectKey) public dataAccess: TagDataAccess,
    @inject(TagActionsInjectKey) public actions: TagActions,
    @inject(AppServiceInjectKey) private appService: AppService,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<TagData>>[] {
    return getTagColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return createTagsToolbarItems({
      formState: this.dataAccess.tagFormData,
      selectedRows: this.selectedRows,
      onAdd: this.handleCreateTag.bind(this),
      onEdit: this.handleEdit.bind(this),
      onDelete: this.handleDelete.bind(this),
      onSearch: this.handleSearch.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      onFormNameChange: this.handleFormNameChange,
      onFormDescriptionChange: this.handleFormDescriptionChange,
      onFormParentChange: this.handleFormParentChange,
    });
  }

  @Action()
  public handleFormNameChange = (value: string): void => {
    this.handleFormFieldChange('name', value);
  }

  @Action()
  public handleFormDescriptionChange = (value: string): void => {
    this.handleFormFieldChange('description', value);
  }

  @Action()
  public handleFormParentChange = (value?: number): void => {
    this.dataAccess.tagFormData.parentTagId = value;
  }

  @Action()
  public handleSearch(query: string): void {
    this.searchQuery = query;
  }

  public entityToTreeNode = (tag: TagData): TreeNode<TagData> => {
    const node = this.tagTreeById.get(tag.id);
    return node || { id: tag.id, data: tag };
  }

  @Computed()
  private get tagTreeById(): Map<number, TreeNode<TagData>> {
    const map = new Map<number, TreeNode<TagData>>();
    const tags = this.dataAccess.entityManager.getCollection;

    tags.forEach(tag => {
      map.set(tag.id, {
        id: tag.id,
        data: tag,
        parentId: tag.parentTagId,
        children: [],
      });
    });

    map.forEach(node => {
      const parentId = node.data.parentTagId;
      if (parentId && map.has(parentId)) {
        map.get(parentId)!.children!.push(node);
      }
    });

    return map;
  }

  @Computed()
  private get tagRoots(): TagData[] {
    const tags = this.dataAccess.entityManager.getCollection;
    const ids = new Set(tags.map(t => t.id));

    return tags.filter(t => !t.parentTagId || !ids.has(t.parentTagId));
  }

  @OnMounted()
  @AsyncAction()
  public async loadTags(): Promise<void> {
    await this.actions.loadTags();
  }

  @Action()
  public handleRowSelect = (row: TreeNode<TagData> | null): void => {
    if (row) {
      this.selectedRowId = row.id;
    } else {
      this.selectedRowId = null;
    }
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<TagData>[]): void => {
    this.selectedRows = rows;
  }

  @Action()
  public handleFormFieldChange(field: string, value: string): void {
    this.dataAccess.tagFormData[field] = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.dataAccess.tagFormData.name = '';
    this.dataAccess.tagFormData.description = '';
    this.dataAccess.tagFormData.parentTagId = undefined;
  }

  @AsyncAction()
  public async handleCreateTag(): Promise<void> {
    const { name, description, parentTagId } = this.dataAccess.tagFormData
    await this.actions.createTag({ name, description, parentTagId });
    Notification.success('Успех', 'Тег добавлен')
    this.handleFormCancel();
  }

  @AsyncAction()
  public async handleEdit(): Promise<void> {
    
  }

  @AsyncAction()
  async performDelete(tags: TreeNode<TagData>[]): Promise<void> {
    await this.actions.deleteSelectedTags(tags);
    Notification.success('Успех', 'Теги удалены');
  }

  async handleDelete(tags: TreeNode<TagData>[]): Promise<void> {
    console.log(tags)
    if (!tags || !tags.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного тега');
      return;
    }

    const count = tags.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранный тег?'
      : `Вы уверены, что хотите удалить ${count} тег(ов)?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(tags)
    });
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: unknown): Promise<void> {
    if (columnId === 'parentTagId') {
      const nextParentId = value === null || value === undefined || value === ''
        ? undefined
        : Number(value);

      const parent = nextParentId
        ? this.dataAccess.entityManager.getEntityById(nextParentId)
        : null;

      await this.actions.updateTag(rowId, {
        parentTagId: nextParentId,
        parentTag: parent ? { id: parent.id, name: parent.name } : undefined,
      });
      return;
    }

    await this.actions.updateTag(rowId, { [columnId]: value } as any);
  }

  @Computed()
  public get tagCollection() {
    if (!this.searchQuery) {
      return this.tagRoots;
    }

    const query = this.searchQuery.toLowerCase();
    return this.dataAccess.entityManager.getCollection.filter(tag =>
      tag.name?.toLowerCase().includes(query) ||
      tag.description?.toLowerCase().includes(query)
    );
  }

  @OnUnmounted()
  public cleanup(): void {
    this.appService.closeRightSidebar();
  }
}

export default TagsModel;
