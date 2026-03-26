import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { AsyncAction, Computed, OnMounted, State, Action } from '@common/hocs/withView/decorators';
import { LevelCompletedDataAccess } from '../../model/services/LevelCompletedDataAccess';
import { LevelCompletedActions } from '../../model/services/LevelCompletedActions';
import { LevelCompletedDataAccessInjectKey, LevelCompletedActionsInjectKey } from '../../model/common/constants';
import { getLevelCompletedColumns } from '../utils/columns';
import { getLevelCompletedToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Completed } from '@common/api/completed/models';
import { Notification } from '@ui/Notification';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';

export interface LevelCompletedProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

export interface CompletedFormData {
  userId?: number;
  description: string;
  image: File ;
}

class LevelCompletedModel extends ViewModel<LevelCompletedProps> {
  constructor(
    @inject(LevelCompletedDataAccessInjectKey) private readonly dataAccess: LevelCompletedDataAccess,
    @inject(LevelCompletedActionsInjectKey) private readonly actions: LevelCompletedActions,
    @inject(HttpConfigInjectKey) private readonly httpConfig: HttpConfig,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  @State()
  public title = 'Управление выполнениями уровня';

  @State()
  public selectedRows: TreeNode<Completed>[] = [];

  @State()
  public completedList: Completed[] = [];

  @State()
  public formData: CompletedFormData = {
    userId: undefined,
    description: '',
    image: null,
  };

  @State()
  public loading: boolean = false;

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { levelId } = this.props;
    if (!levelId) return;

    await this.loadCompleted();
  }

  @AsyncAction()
  public async loadCompleted(): Promise<void> {
    this.loading = true;
    try {
      const data = await this.actions.getByLevelId(this.props.levelId);
      this.completedList = data.completed;
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить выполнения');
    } finally {
      this.loading = false;
    }
  }

  @Action()
  public handleFormFieldChange(field: string, value: any): void {
    this.formData[field] = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.formData = {
      userId: undefined,
      description: '',
      image: null,
    };
  }

  @AsyncAction()
  public async handleCreateCompleted(): Promise<void> {
    const { userId, description, image } = this.formData;

    if (!userId) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    if (!description.trim()) {
      Notification.warning('Предупреждение', 'Описание обязательно');
      return;
    }

    if (!image) {
      Notification.warning('Предупреждение', 'Загрузите изображение');
      return;
    }

    try {
      const completed = await this.dataAccess.create({
        levelId: this.props.levelId,
        userId,
        description,
      });

      await this.dataAccess.updateImage({ id: completed.id, image })

      await this.loadCompleted();
      Notification.success('Успех', 'Выполнение добавлено');
      this.handleFormCancel();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить выполнение');
    }
  }

  @AsyncAction()
  public async handleDelete(rows: TreeNode<Completed>[]): Promise<void> {
    const levelCompletedIds = rows.map(row => row.data.id);
    await this.dataAccess.delete({ levelCompletedIds });
    await this.loadCompleted();
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: any): Promise<void> {
    if (columnId === 'image') {
      try {
        await this.dataAccess.updateImage({ id: rowId, image: value });
        await this.loadCompleted();
        Notification.success('Успех', 'Изображение обновлено');
      } catch (error) {
        Notification.error('Ошибка', 'Не удалось обновить изображение');
      }
    } else if (columnId === 'description') {
      try {
        await this.dataAccess.update({ completedId: rowId, description: value });
        await this.loadCompleted();
        Notification.success('Успех', 'Описание обновлено');
      } catch (error) {
        Notification.error('Ошибка', 'Не удалось обновить описание');
      }
    }
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns() {
    return getLevelCompletedColumns({
      storageUrl: this.httpConfig.getConfig().storageUrl
    });
  }

  @Computed()
  public get getToolbarItems() {
    return getLevelCompletedToolbarItems({
      selectedRows: this.selectedRows,
      userId: this.formData.userId,
      description: this.formData.description,
      image: this.formData.image,
      onUserIdChange: (value) => this.handleFormFieldChange('userId', value),
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
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default LevelCompletedModel;
