import { withView } from '@common/hocs/withView';
import RoleContentView from './RoleDescription';
import RoleContentModel from './RoleDescription.model';

export const RoleContent = withView(RoleContentView, RoleContentModel);
export default RoleContent;
