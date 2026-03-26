import { withView } from '@common/hocs/withView';
import RoleCardView from './RoleCard';
import RoleCardModel from './RoleCard.model';

export const RoleCard = withView(RoleCardView, RoleCardModel);
export default RoleCard;
