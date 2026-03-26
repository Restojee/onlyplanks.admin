import withModule from '@common/hocs/withModule';
import UserApi from '@common/api/users/api';
import { UserActions, UserActionsInjectKey, UserDataAccess, UserDataAccessInjectKey } from '@/modules/users/model/services';
import { UsersApiInjectKey } from '@/modules/users/model/common/constants';
import { withView } from '@common/hocs/withView';
import Users from '@/modules/users/view/components/Users';
import UsersModel from '@/modules/users/view/components/Users.model';

const UsersView = withView(Users, UsersModel);

const UserModule = withModule({
  key: 'UsersModule',
  component: UsersView,
  providers: [
    {
      key: UsersApiInjectKey,
      provide: UserApi,
    },
    {
      key: UserDataAccessInjectKey,
      provide: UserDataAccess,
    },
    {
      key: UserActionsInjectKey,
      provide: UserActions,
    },
  ]
});

export default UserModule;
