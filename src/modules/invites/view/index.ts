import withModule from '@common/hocs/withModule';
import InviteApi from '@common/api/invites/api';
import Invites from '@/modules/invites/view/components/Invites';
import { InviteActions, InviteDataAccess } from '@/modules/invites/model/services';
import { InviteActionsInjectKey, InviteDataAccessInjectKey, InvitesApiInjectKey } from '@/modules/invites/model/common/constants';

const InvitesModule = withModule({
  key: 'InvitesModule',
  component: Invites,
  providers: [
    {
      key: InvitesApiInjectKey,
      provide: InviteApi,
    },
    {
      key: InviteDataAccessInjectKey,
      provide: InviteDataAccess,
    },
    {
      key: InviteActionsInjectKey,
      provide: InviteActions,
    },
  ]
});

export default InvitesModule;
