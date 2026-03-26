import withModule from '@common/hocs/withModule';
import LevelsModule from '@/modules/levels/view/containers/LevelsModule';
import LevelDataAccess from '@/modules/levels/model/services/LevelDataAccess';
import {
  LevelActionsInjectKey,
  LevelDataAccessInjectKey,
  LevelsApiInjectKey,
} from '@/modules/levels/model/common/constants';
import LevelActions from '@/modules/levels/model/services/LevelActions';
import LevelsApi from '@common/api/levels';

const LevelModule = withModule({
  key: 'LevelsModule',
  component: LevelsModule,
  providers: [
    {
      key: LevelsApiInjectKey,
      provide: LevelsApi,
    },
    {
      key: LevelActionsInjectKey,
      provide: LevelActions,
    },
    {
      key: LevelDataAccessInjectKey,
      provide: LevelDataAccess,
    },
  ]
})

export default LevelModule;
