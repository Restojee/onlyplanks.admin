import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { TipDataAccess, TipActions, TipDataAccessInjectKey, TipActionsInjectKey } from '@/modules/tips/model/services';
import type { TipData, TipFormData } from '@/modules/tips/model/entities';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import type { TreeNode } from '@ui/DataTreeTable';
import type { PaginationResponse, ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import type { TipsProps } from '@/modules/tips/view/components/Tips';
import { createTipsToolbarItems, getTipColumns } from '@/modules/tips/view/components/utils';

class TipsModel extends ViewModel<TipsProps> {
  private contentManagerRef: ContentManagerRef  = null;

  @State()
  public searchQuery: string = '';

  @State()
  selectedRows: TreeNode<TipData>[] = [];

  constructor(
    @inject(TipDataAccessInjectKey) public dataAccess: TipDataAccess,
    @inject(TipActionsInjectKey) public actions: TipActions
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.loadTips = this.loadTips.bind(this);
  }

  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  }

  private async reloadData(): Promise<void> {
    await this.contentManagerRef?.reloadData();
  }

  @Computed()
  public get pageTitle(): string {
    return 'Управление полезной информацией';
  }

  @Computed()
  public get tableColumns(): any[] {
    return getTipColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return createTipsToolbarItems({
      formState: this.dataAccess.tipFormData,
      selectedRows: this.selectedRows,
      onAdd: this.handleCreateTip.bind(this),
      onEdit: this.handleEdit.bind(this),
      onDelete: this.handleDelete.bind(this),
      onSearch: this.handleSearch.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      onFormTitleChange: (value) => this.handleFormFieldChange.call(this, 'title', value),
      onFormTextChange: (value) => this.handleFormFieldChange.call(this, 'text', value),
    });
  }

  @Action()
  public async handleSearch(query: string): Promise<void> {
    this.searchQuery = query;
    await this.reloadData();
  }

  public entityToTreeNode = (tip: TipData) => {
    return { id: tip.id, data: tip };
  }

  @AsyncAction()
  public async loadTips (pageIndex: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc'): Promise<PaginationResponse> {
    const result = await this.actions.loadTips(pageIndex, pageSize, this.searchQuery, sortField, sortDirection);
    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      pageSize: result.pageSize,
      page: result.page,
      data: result.data,
    };
  }

  @Action()
  public handleRowSelect = (rows: TreeNode<TipData>[]): void => {
    this.selectedRows = rows;
  }

  @Action()
  public handleFormFieldChange(field: keyof TipFormData, value: string): void {
    this.dataAccess.tipFormData[field] = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.dataAccess.tipFormData.title = '';
    this.dataAccess.tipFormData.text = '';
  }

  @AsyncAction()
  public async handleCreateTip(): Promise<void> {
    const { title, text } = this.dataAccess.tipFormData
    await this.actions.createTip({ title, text });
    await this.reloadData();
    Notification.success('Успех', 'Заметка добавлена')
    this.handleFormCancel();
  }

  @AsyncAction()
  public async handleEdit(tips: any[]): Promise<void> {
    if (!tips || tips.length === 0) {
      return;
    }

    const selectedTip = tips[0].data;
    console.log('Редактирование заметки:', selectedTip.title);
  }

  @AsyncAction()
  async performDelete(tips: TreeNode<TipData>[]): Promise<void> {
    await this.actions.deleteSelectedTips(tips);
    await this.reloadData();
    Notification.success('Успех', 'Заметки удалены');
  }

  async handleDelete(tips: TreeNode<TipData>[]): Promise<void> {
    if (!tips || !tips.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одной заметки');
      return;
    }

    showConfirm('Подтверждение удаления', {
      text: 'Вы уверены, что хотите удалить выбранные заметки?',
      size: 'md',
      onSuccess: () => this.performDelete(tips)
    });
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: string): Promise<void> {
    await this.actions.updateTip(rowId, { [columnId]: value });
    await this.reloadData();
  }

  @Computed()
  public get tipCollection() {
    return this.dataAccess.entityManager.getCollection;
  }
}

export default TipsModel;
