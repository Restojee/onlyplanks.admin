import { withView } from '@common/hocs/withView';
import RolePermissionsView from './RolePermissions';
import RolePermissionsModel from './RolePermissions.model';

export const RolePermissions = withView(RolePermissionsView, RolePermissionsModel);
export default RolePermissions;
