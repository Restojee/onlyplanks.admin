import { withView } from '@common/hocs/withView';
import RoleOtherPermissionsView from './RoleOtherPermissions';
import RoleOtherPermissionsModel from './RoleOtherPermissions.model';

export type { RoleOtherPermissionsProps } from './RoleOtherPermissions';

export const RoleOtherPermissions = withView(RoleOtherPermissionsView, RoleOtherPermissionsModel);

export { RoleOtherPermissionsModel };
