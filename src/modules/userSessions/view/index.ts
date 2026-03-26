import withModule from '@common/hocs/withModule';
import UserSessions from '@/modules/userSessions/view/components/UserSessions';
import UserSessionsApi from '@common/api/userSessions/api';
import { UserSessionsActions, UserSessionsDataAccess } from '@/modules/userSessions/model/services';
import {
  UserSessionsActionsInjectKey,
  UserSessionsApiInjectKey,
  UserSessionsDataAccessInjectKey,
} from '@/modules/userSessions/model/common/constants';

const UserSessionsModule = withModule({
  key: 'UserSessionsModule',
  component: UserSessions,
  providers: [
    {
      key: UserSessionsApiInjectKey,
      provide: UserSessionsApi,
    },
    {
      key: UserSessionsDataAccessInjectKey,
      provide: UserSessionsDataAccess,
    },
    {
      key: UserSessionsActionsInjectKey,
      provide: UserSessionsActions,
    },
  ],
});

export default UserSessionsModule;
