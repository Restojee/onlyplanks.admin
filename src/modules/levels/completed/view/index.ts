import withModule from '@common/hocs/withModule';
import LevelCompletedManager from './components/LevelCompleted';
import { LevelCompletedDataAccess } from '../model/services/LevelCompletedDataAccess';
import { LevelCompletedActions } from '../model/services/LevelCompletedActions';
import { LevelCompletedDataAccessInjectKey, LevelCompletedActionsInjectKey } from '../model/common/constants';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import { LevelsApiInjectKey } from '@/modules/levels/model/common/constants';
import LevelsApi from '@common/api/levels';

const LevelCompletedModule = withModule({
  key: 'LevelCompletedModule',
  component: LevelCompletedManager,
  providers: [
    {
      key: CompletedApiInjectKey,
      provide: CompletedApi,
    },
    {
      key: LevelsApiInjectKey,
      provide: LevelsApi,
    },
    {
      key: LevelCompletedDataAccessInjectKey,
      provide: LevelCompletedDataAccess,
    },
    {
      key: LevelCompletedActionsInjectKey,
      provide: LevelCompletedActions,
    },
  ]
});

export default LevelCompletedModule;
