import withModule from '@common/hocs/withModule';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';
import { FavoritesActions, FavoritesDataAccess } from '@/modules/favorites/model/services';
import { FavoritesActionsInjectKey, FavoritesDataAccessInjectKey } from '@/modules/favorites/model/common/constants';
import Favorites from '@/modules/favorites/view/components/Favorites';

const FavoritesModule = withModule({
  key: 'FavoritesModule',
  component: Favorites,
  providers: [
    {
      key: FavoriteApiInjectKey,
      provide: FavoriteApi,
    },
    {
      key: FavoritesDataAccessInjectKey,
      provide: FavoritesDataAccess,
    },
    {
      key: FavoritesActionsInjectKey,
      provide: FavoritesActions,
    },
  ]
});

export default FavoritesModule;
