import withModule from '@common/hocs/withModule';
import LevelFavoritesManager from './components/LevelFavorites';
import { LevelFavoritesDataAccess } from '../model/services/LevelFavoritesDataAccess';
import { LevelFavoritesActions } from '../model/services/LevelFavoritesActions';
import { LevelFavoritesDataAccessInjectKey, LevelFavoritesActionsInjectKey } from '../model/common/constants';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';

const LevelFavoritesModule = withModule({
  key: 'LevelFavoritesModule',
  component: LevelFavoritesManager,
  providers: [
    {
      key: FavoriteApiInjectKey,
      provide: FavoriteApi,
    },
    {
      key: LevelFavoritesDataAccessInjectKey,
      provide: LevelFavoritesDataAccess,
    },
    {
      key: LevelFavoritesActionsInjectKey,
      provide: LevelFavoritesActions,
    },
  ]
});

export default LevelFavoritesModule;
