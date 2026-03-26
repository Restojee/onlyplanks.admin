import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { LevelFavoritesDataAccess } from '../../model/services/LevelFavoritesDataAccess';
import { LevelFavoritesActions } from '../../model/services/LevelFavoritesActions';
import { LevelFavoritesActionsInjectKey, LevelFavoritesDataAccessInjectKey } from '../../model/common/constants';
import { getLevelFavoritesColumns } from '../utils/columns';
import { getLevelFavoritesToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Favorite } from '@common/api/favorites/models';
import { Notification } from '@ui/Notification';

export interface LevelFavoritesProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

class LevelFavoritesModel extends ViewModel<LevelFavoritesProps> {
  constructor(
    @inject(LevelFavoritesDataAccessInjectKey) private readonly dataAccess: LevelFavoritesDataAccess,
    @inject(LevelFavoritesActionsInjectKey) private readonly actions: LevelFavoritesActions,
  ) {
    super();
  }

  @State()
  public title = 'Управление избранным уровня';

  @State()
  public selectedRows: TreeNode<Favorite>[] = [];

  @State()
  public favoritesList: Favorite[] = [];

  @State()
  public loading: boolean = false;

  @State()
  public formData = {
    userId: undefined as number,
  };

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { levelId } = this.props;
    if (!levelId) return;

    await this.loadFavorites();
  }

  @AsyncAction()
  public async loadFavorites(): Promise<void> {
    this.loading = true;
    try {
      this.favoritesList = await this.actions.getFavorites(this.props.levelId);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить избранное');
    } finally {
      this.loading = false;
    }
  }

  @AsyncAction()
  public async handleDelete(rows: TreeNode<Favorite>[]): Promise<void> {
    const LevelFavoriteIds = rows.map(row => row.data.id);
    
    if (LevelFavoriteIds.length === 0) {
      Notification.warning('Предупреждение', 'Выберите элементы для удаления');
      return;
    }

    try {
      await this.dataAccess.delete({ LevelFavoriteIds });
      await this.loadFavorites();
      Notification.success('Успех', 'Удалено из избранного');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось удалить из избранного');
    }
  }

  @Action()
  public handleFormFieldChange(field: 'userId', value: number): void {
    this.formData.userId = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.formData.userId = undefined;
  }

  @AsyncAction()
  public async handleCreateFavorite(): Promise<void> {
    const { userId } = this.formData;

    if (!userId) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    try {
      await this.dataAccess.create({
        levelIds: [this.props.levelId],
        userId,
      });
      await this.loadFavorites();
      Notification.success('Успех', 'Добавлено в избранное');
      this.handleFormCancel();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить в избранное');
    }
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns() {
    return getLevelFavoritesColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getLevelFavoritesToolbarItems({
      selectedRows: this.selectedRows,
      userId: this.formData.userId,
      onUserIdChange: (value) => this.handleFormFieldChange('userId', value),
      onSubmit: this.handleCreateFavorite.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      onDelete: this.handleDelete.bind(this),
    });
  }

  @Computed()
  public get favoritesCollection() {
    return this.favoritesList;
  }

  public entityToTreeNode = (favorite: Favorite) => {
    return { id: favorite.id, data: favorite, children: [] };
  }

  @Action()
  public handleRowSelect = (rows: TreeNode<Favorite>[]): void => {
    this.selectedRows = rows;
  }

  public handleClose = (): void => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default LevelFavoritesModel;
