import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, OnUnmounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import LevelDataAccess from '@/modules/levels/model/services/LevelDataAccess';
import LevelActions from '@/modules/levels/model/services/LevelActions';
import { LevelDataAccessInjectKey, LevelActionsInjectKey } from '@/modules/levels/model/common/constants';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import LevelContentModule from '@/modules/levels/view/containers/LevelContentModule';
import { getLevelColumns } from '@/modules/levels/view/utils/columns';
import type { TreeNode } from '@ui/DataTreeTable';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { getLevelToolbarItems } from '@/modules/levels/view/utils/toolbarItems';
import { LevelsProps } from '@/modules/levels/view/containers/Levels';
import type { ContentManagerRef, PaginationResponse } from '@ui/ContentManager/ContentManager.model';
import type { LevelData } from '@/modules/levels/common/types';
import { SortDirection } from '@common/types/sorting';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';

class LevelsModel extends ViewModel<LevelsProps> {

  @State()
  title = 'Управление уровнями';

  @State()
  searchQuery = '';

  @State()
  selectedRows: TreeNode<LevelData>[] = [];

  @State()
  selectedRowId: string | number  = null;

  @State()
  filterUserId?: number;

  @State()
  filterUserSearchTypes: ('completed' | 'comments' | 'favorites' | 'author')[] = [];

  @State()
  filterSearchText: string = '';

  @State()
  filterSelectedColumns: string[] = ['name', 'description'];

  private contentManagerRef: ContentManagerRef  = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  }

  constructor(
    @inject(LevelDataAccessInjectKey) public dataAccess: LevelDataAccess,
    @inject(LevelActionsInjectKey) public actions: LevelActions,
    @inject(AppServiceInjectKey) private appService: AppService,
    @inject(HttpConfigInjectKey) private readonly httpConfig: HttpConfig,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.loadLevels = this.loadLevels.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns(): any[] {
    return getLevelColumns({
      storageUrl: this.httpConfig.getConfig().storageUrl,
    });
  }

  @Computed()
  public get getToolbarItems () {
    return getLevelToolbarItems({
      selectedRows: this.selectedRows,
      onAdd: this.handleCreateLevel.bind(this),
      onEdit: this.handleEdit.bind(this),
      onDelete: this.handleDelete.bind(this),
      onSearch: this.handleSearch.bind(this),
      onManageTags: this.handleManageTags.bind(this),
      searchQuery: this.searchQuery,
      formState: this.dataAccess.levelFormData,
      onFormNameChange: this.handleFormNameChange.bind(this),
      onFormDescriptionChange: this.handleFormDescriptionChange.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
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

  handleSearch(value: string) {
    this.filterSearchText = value;
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterUserChange = (userId: number): void => {
    this.filterUserId = userId;
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterUserSearchTypesChange = (types: ('completed' | 'comments' | 'favorites' | 'author')[]): void => {
    this.filterUserSearchTypes = types;
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterSearchTextChange = (text: string): void => {
    this.filterSearchText = text;
    this.contentManagerRef?.reloadData();
  }

  @Action()
  public handleFilterSelectedColumnsChange = (columns: string[]): void => {
    this.filterSelectedColumns = columns;
    this.contentManagerRef?.reloadData();
  }

  @Computed()
  public get filters() {
    return [
      {
        id: 'user-filter',
        component: null, 
      },
      {
        id: 'column-search',
        component: null, 
      },
    ];
  }

  @Action()
  public handleRowSelect = (row: TreeNode<LevelData> ): void => {
    if (row) {
      this.selectedRowId = row.id;
      this.handleManageTags(row);
    } else {
      this.selectedRowId = null;
    }
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<LevelData>[]): void => {
    this.selectedRows = rows;
  }

  public entityToTreeNode = (level: LevelData) => {
    return { id: level.id, data: level };
  }

  @AsyncAction()
  public async loadLevels(page: number, pageSize: number, sortField?: string, sortDirection?: SortDirection): Promise<PaginationResponse<LevelData>> {
    const canSearchByName = this.filterSelectedColumns.includes('name');
    const canSearchByDescription = this.filterSelectedColumns.includes('description');

    const userId = this.filterUserId;
    const isCompleted = userId && this.filterUserSearchTypes.includes('completed') ? true : undefined;
    const isFavorite = userId && this.filterUserSearchTypes.includes('favorites') ? true : undefined;
    const isCreatedByUser = userId && this.filterUserSearchTypes.includes('author') ? true : undefined;
    const isWithComment = userId && this.filterUserSearchTypes.includes('comments') ? true : undefined;

    const response = await this.actions.loadLevelCollection({
      page: page,
      size: pageSize,
      name: canSearchByName ? this.filterSearchText : '',
      description: canSearchByDescription ? this.filterSearchText : '',
      userId,
      isCompleted,
      isFavorite,
      isCreatedByUser,
      isWithComment,
      sortField,
      sortDirection,
    })

    return response;
  }

  @Computed()
  public get levelCollection() {
    return this.dataAccess.levels.getCollection;
  }

  @Action()
  public handleFormFieldChange(field: 'name' | 'description', value: string): void {
    this.dataAccess.levelFormData[field] = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.dataAccess.levelFormData.name = '';
    this.dataAccess.levelFormData.description = '';
  }

  @AsyncAction()
  public async handleCreateLevel(): Promise<void> {
    const { name, description } = this.dataAccess.levelFormData;
    
    if (!name.trim()) {
      Notification.warning('Предупреждение', 'Название уровня обязательно');
      return;
    }

    await this.actions.createLevel({ name, description });
    Notification.success('Успех', 'Уровень добавлен');
    await this.contentManagerRef.reloadData();
    this.handleFormCancel();
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: unknown, rowData: LevelData): Promise<void> {
    if (columnId === 'image' && value instanceof File) {
      await this.actions.updateLevelImage({ id: rowId, image: value });
      Notification.success('Успех', 'Картинка обновлена');
      await this.contentManagerRef.reloadData();
      return;
    }

    await this.actions.updateLevelCell(rowId, columnId, String(value));
    Notification.success('Успех', 'Уровень обновлен');
  }

  @Action()
  public async handleEdit(levels: TreeNode<LevelData>[]): Promise<void> {
    if (!levels || !levels.length) {
      return;
    }
    const selectedLevel = levels[0].data;
    console.log('Редактирование уровня:', selectedLevel.name);
  }

  @AsyncAction()
  async performDelete(levels: TreeNode<LevelData>[]): Promise<void> {
    for (const level of levels) {
      await this.actions.removeLevel({ id: level.data.id });
      await this.contentManagerRef.reloadData();
    }
    Notification.success('Успех', 'Уровни удалены');
  }

  async handleDelete(levels: TreeNode<LevelData>[]): Promise<void> {
    if (!levels || !levels.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного уровня');
      return;
    }

    showConfirm('Подтверждение удаления', {
      text: 'Вы уверены, что хотите удалить выбранные уровни?',
      size: 'md',
      onSuccess: this.getDeleteSuccessHandler(levels),
    });
  }

  private getDeleteSuccessHandler(levels: TreeNode<LevelData>[]): (() => void) {
    const handler = (): void => {
      void this.performDelete(levels);
    }
    return handler;
  }

  public handleManageTags(level: TreeNode<LevelData>): void {
    if (!level) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    const levelId = level.data.id;
    this.appService.openRightSidebar(
      LevelContentModule,
      `Управление уровнем ${level.data.name}`,
      {
        levelId,
        onClose: this.handleRightSidebarClose,
      }
    );
  }

  @Action()
  private handleRightSidebarClose = (): void => {
    this.appService.closeRightSidebar();
    void this.contentManagerRef?.reloadData();
  }

  @OnUnmounted()
  public cleanup(): void {
    this.appService.closeRightSidebar();
  }
}

export default LevelsModel;
