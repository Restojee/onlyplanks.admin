import withModule from '@common/hocs/withModule';
import {
  RoleDataAccess,
  RoleDataAccessInjectKey,
  RolesService,
  RolesServiceInjectKey,
  RolesApiInjectKey,
} from '@/modules/roles/model/services';
import RoleContentView from '@/modules/roles/modules/RoleContent/view/containers/RoleContentView/RoleContentView';
import RolesApi from '@common/api/roles/api';

export const RoleContent = withModule({
  key: 'RoleContentModule',
  component: RoleContentView,
  providers: [
    {
      key: RolesApiInjectKey,
      provide: RolesApi,
    },
    {
      key: RoleDataAccessInjectKey,
      provide: RoleDataAccess,
    },
    {
      key: RolesServiceInjectKey,
      provide: RolesService,
    },
  ]
});
