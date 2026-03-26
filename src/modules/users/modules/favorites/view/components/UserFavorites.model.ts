import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { UserFavoritesDataAccess } from '../../model/services/UserFavoritesDataAccess';
import { UserFavoritesActions } from '../../model/services/UserFavoritesActions';
import { UserFavoritesActionsInjectKey, UserFavoritesDataAccessInjectKey } from '../../model/common/constants';
import { getUserFavoritesColumns } from '../utils/columns';
import { getUserFavoritesToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Favorite } from '@common/api/favorites/models';
import { Notification } from '@ui/Notification';

export interface UserFavoritesProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

class UserFavoritesModel extends ViewModel<UserFavoritesProps> {
  constructor(
    @inject(UserFavoritesDataAccessInjectKey) private readonly dataAccess: UserFavoritesDataAccess,
    @inject(UserFavoritesActionsInjectKey) private readonly actions: UserFavoritesActions,
  ) {
    super();
  }

  @State()
  public title = 'Избранные уровни';

  @State()
  public selectedRows: TreeNode<Favorite>[] = [];

  @Computed()
  public get favoritesList(): Favorite[] {
    return this.dataAccess.favoritesData;
  }

  @State()
  public formData = {
    levelId: 0,
  };

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { userId } = this.props;
    if (!userId) return;

    await this.loadFavorites();
  }

  @AsyncAction()
  public async loadFavorites(): Promise<void> {
    try {
      await this.actions.loadFavorites(this.props.userId);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить избранное');
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
  public handleFormFieldChange(field: 'levelId', value: number): void {
    this.formData.levelId = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.formData.levelId = undefined;
  }

  @AsyncAction()
  public async handleCreateFavorite(): Promise<void> {
    const { levelId } = this.formData;

    if (!levelId) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    try {
      await this.dataAccess.create({
        levelIds: [levelId],
        userId: this.props.userId,
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
    return getUserFavoritesColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getUserFavoritesToolbarItems({
      selectedRows: this.selectedRows,
      levelId: this.formData.levelId,
      onLevelIdChange: (value) => this.handleFormFieldChange('levelId', value),
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

export default UserFavoritesModel;
