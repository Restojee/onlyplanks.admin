import withModule from '@common/hocs/withModule';
import { withView } from '@common/hocs/withView';
import LevelsApi from '@common/api/levels/api';
import LevelActions from '@/modules/levels/model/services/LevelActions';
import LevelDataAccess from '@/modules/levels/model/services/LevelDataAccess';
import { LevelsApiInjectKey, LevelActionsInjectKey, LevelDataAccessInjectKey } from '@/modules/levels/model/common/constants';
import LevelSelectView from './LevelSelectView';
import LevelSelectViewModel from './LevelSelectView.model';

const LevelSelectWithView = withView(LevelSelectView, LevelSelectViewModel);

export const LevelSelect = withModule({
  key: 'LevelSelectModule',
  component: LevelSelectWithView,
  providers: [
    {
      key: LevelsApiInjectKey,
      provide: LevelsApi,
    },
    {
      key: LevelDataAccessInjectKey,
      provide: LevelDataAccess,
    },
    {
      key: LevelActionsInjectKey,
      provide: LevelActions,
    },
  ]
});
