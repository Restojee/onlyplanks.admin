import withModule from '@common/hocs/withModule';
import RolesApi from '@common/api/roles/api';
import { RoleDataAccess, RoleDataAccessInjectKey, RolesService, RolesServiceInjectKey } from '@/modules/roles/model/services';
import { RolesApiInjectKey } from '@/modules/roles/model/common/constants';
import { RolesGrid } from '@/modules/roles/view/containers/RolesGrid';

const RoleModule = withModule({
  key: 'RolesModule',
  component: RolesGrid,
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

export default RoleModule;
