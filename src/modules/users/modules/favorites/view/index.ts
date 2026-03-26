import withModule from '@common/hocs/withModule';
import UserFavoritesManager from './components/UserFavorites';
import { UserFavoritesDataAccess } from '../model/services/UserFavoritesDataAccess';
import { UserFavoritesActions } from '../model/services/UserFavoritesActions';
import { UserFavoritesDataAccessInjectKey, UserFavoritesActionsInjectKey } from '../model/common/constants';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';

const UserFavoritesModule = withModule({
  key: 'UserFavoritesModule',
  component: UserFavoritesManager,
  providers: [
    {
      key: FavoriteApiInjectKey,
      provide: FavoriteApi,
    },
    {
      key: UserFavoritesDataAccessInjectKey,
      provide: UserFavoritesDataAccess,
    },
    {
      key: UserFavoritesActionsInjectKey,
      provide: UserFavoritesActions,
    },
  ]
});

export default UserFavoritesModule;
