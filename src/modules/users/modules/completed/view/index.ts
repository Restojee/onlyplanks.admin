import withModule from '@common/hocs/withModule';
import UserCompletedManager from './components/UserCompleted';
import { UserCompletedDataAccess } from '../model/services/UserCompletedDataAccess';
import { UserCompletedActions } from '../model/services/UserCompletedActions';
import { UserCompletedDataAccessInjectKey, UserCompletedActionsInjectKey } from '../model/common/constants';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';

const UserCompletedModule = withModule({
  key: 'UserCompletedModule',
  component: UserCompletedManager,
  providers: [
    {
      key: CompletedApiInjectKey,
      provide: CompletedApi,
    },
    {
      key: UserCompletedDataAccessInjectKey,
      provide: UserCompletedDataAccess,
    },
    {
      key: UserCompletedActionsInjectKey,
      provide: UserCompletedActions,
    },
  ]
});

export default UserCompletedModule;
