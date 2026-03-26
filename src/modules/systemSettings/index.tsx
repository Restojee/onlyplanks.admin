import SystemSettings from './view/components/SystemSettings';
import withModule from "@common/hocs/withModule";
import {
  RoleDataAccessInjectKey,
  RolesApiInjectKey,
  RolesServiceInjectKey
} from "@/modules/roles/model/common/constants";
import { RolesService } from "@/modules/roles/model/services";
import RolesApi from "@common/api/roles/api";
import roleDataAccess from "@/modules/roles/model/services/RoleDataAccess";

export default withModule({
  key: 'SystemSettingsModule',
  component: SystemSettings,
  providers: [
    {
      key: RolesServiceInjectKey,
      provide: RolesService,
    },
    {
      key: RolesApiInjectKey,
      provide: RolesApi,
    },
    {
      key: RoleDataAccessInjectKey,
      provide: roleDataAccess,
    },
  ]
});
