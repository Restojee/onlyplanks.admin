import withModule from '@common/hocs/withModule';
import { withView } from '@common/hocs/withView';
import UserApi from '@common/api/users/api';
import { UserActions, UserActionsInjectKey, UserDataAccess, UserDataAccessInjectKey } from '@/modules/users/model/services';
import { UsersApiInjectKey } from '@/modules/users/model/common/constants';
import UserSelectView from './UserSelectView';
import UserSelectViewModel from './UserSelectView.model';

const UserSelectWithView = withView(UserSelectView, UserSelectViewModel);

export const UserSelect = withModule({
  key: 'UserSelectModule',
  component: UserSelectWithView,
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
