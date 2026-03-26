import { withView } from '@common/hocs/withView';
import RolesGridView from './RolesGrid';
import RolesGridModel from './RolesGrid.model';

export const RolesGrid = withView(RolesGridView, RolesGridModel);
export default RolesGrid;
