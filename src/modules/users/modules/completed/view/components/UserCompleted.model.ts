import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { AsyncAction, Computed, OnMounted, State, Action } from '@common/hocs/withView/decorators';
import { UserCompletedDataAccess } from '../../model/services/UserCompletedDataAccess';
import { UserCompletedActions } from '../../model/services/UserCompletedActions';
import { UserCompletedDataAccessInjectKey, UserCompletedActionsInjectKey } from '../../model/common/constants';
import { getUserCompletedColumns } from '../utils/columns';
import { getUserCompletedToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Completed } from '@common/api/completed/models';
import { Notification } from '@ui/Notification';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';

export interface UserCompletedProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

class UserCompletedModel extends ViewModel<UserCompletedProps> {
  constructor(
    @inject(UserCompletedDataAccessInjectKey) private readonly dataAccess: UserCompletedDataAccess,
    @inject(UserCompletedActionsInjectKey) private readonly actions: UserCompletedActions,
    @inject(HttpConfigInjectKey) private readonly httpConfig: HttpConfig,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  @State()
  public contentManagerRef: any;

  @State()
  public loading: boolean = false;

  @State()
  public formData = {
    levelId: undefined as number,
    description: '',
    image: null as File ,
  };


  @Action()
  public setContentManagerRef () {
    this.contentManagerRef = {
      handleDelete: () => this.handleDelete(this.selectedRows),
      selectedRows: this.selectedRows,
    }
  }

  @State()
  public selectedRows: TreeNode<Completed>[] = [];

  @Computed()
  public get completedList(): Completed[] {
    return this.dataAccess.completedData;
  }
  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { userId } = this.props;
    if (!userId) return;

    await this.loadCompleted();
  }

  @AsyncAction()
  public async loadCompleted(): Promise<void> {
    this.loading = true;
    try {
      await this.actions.loadCompleted(this.props.userId);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить выполнения');
    } finally {
      this.loading = false;
    }
  }

  @AsyncAction()
  public async handleDelete(rows: TreeNode<Completed>[]): Promise<void> {
    const levelCompletedIds = rows.map(row => row.data.id);
    
    if (levelCompletedIds.length === 0) {
      Notification.warning('Предупреждение', 'Выберите элементы для удаления');
      return;
    }

    await this.dataAccess.delete({ levelCompletedIds });
    await this.loadCompleted();
    Notification.success('Успех', 'Выполнения удалены');
  }

  @Action()
  public handleFormFieldChange(field: 'levelId' | 'description' | 'image', value: number | string | File ): void {
    if (field === 'levelId') {
      this.formData.levelId = value as number;
    } else if (field === 'description') {
      this.formData.description = value as string;
    } else if (field === 'image') {
      this.formData.image = value as File ;
    }
  }

  @Action()
  public handleFormCancel(): void {
    this.formData.levelId = undefined;
    this.formData.description = '';
    this.formData.image = null;
  }

  @AsyncAction()
  public async handleCreateCompleted(): Promise<void> {
    const { levelId, description, image } = this.formData;

    if (!levelId) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    try {
      await this.dataAccess.create({
        levelId,
        userId: this.props.userId,
        description,
      });
      await this.loadCompleted();
      Notification.success('Успех', 'Выполнение добавлено');
      this.handleFormCancel();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить выполнение');
    }
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: any): Promise<void> {
    try {
      await this.dataAccess.update({ completedId: rowId, description: value });
      await this.loadCompleted();
      Notification.success('Успех', 'Информация о выполненном обновлена');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось обновлить описание');
    }
  }

  @Computed()
  public get tableColumns() {
    return getUserCompletedColumns({
      storageUrl: this.httpConfig.getConfig().storageUrl
    });
  }

  @Computed()
  public get getToolbarItems() {
    return getUserCompletedToolbarItems({
      selectedRows: this.selectedRows,
      levelId: this.formData.levelId,
      description: this.formData.description,
      image: this.formData.image,
      onLevelIdChange: (value) => this.handleFormFieldChange('levelId', value),
      onDescriptionChange: (value) => this.handleFormFieldChange('description', value),
      onImageChange: (value) => this.handleFormFieldChange('image', value),
      onSubmit: this.handleCreateCompleted.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      onDelete: this.handleDelete.bind(this),
    });
  }

  @Computed()
  public get completedCollection() {
    return this.completedList;
  }

  public entityToTreeNode = (completed: Completed) => {
    return { id: completed.id, data: completed, children: [] };
  }

  @Action()
  public handleRowSelect = (rows: TreeNode<Completed>[]): void => {
    this.selectedRows = rows;
  }

  public handleClose = (): void => {
    this.props.onClose();
  }
}

export default UserCompletedModel;
