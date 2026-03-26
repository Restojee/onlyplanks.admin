import withModule from '@common/hocs/withModule';
import UserAuditLogs from '@/modules/userAuditLogs/view/components/UserAuditLogs';
import UserAuditLogsApi from '@common/api/userAuditLogs/api';
import { UserAuditLogsActions, UserAuditLogsDataAccess } from '@/modules/userAuditLogs/model/services';
import {
  UserAuditLogsActionsInjectKey,
  UserAuditLogsApiInjectKey,
  UserAuditLogsDataAccessInjectKey,
} from '@/modules/userAuditLogs/model/common/constants';

const UserAuditLogsModule = withModule({
  key: 'UserAuditLogsModule',
  component: UserAuditLogs,
  providers: [
    {
      key: UserAuditLogsApiInjectKey,
      provide: UserAuditLogsApi,
    },
    {
      key: UserAuditLogsDataAccessInjectKey,
      provide: UserAuditLogsDataAccess,
    },
    {
      key: UserAuditLogsActionsInjectKey,
      provide: UserAuditLogsActions,
    },
  ],
});

export default UserAuditLogsModule;
