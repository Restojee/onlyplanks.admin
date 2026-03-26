import withModule from '@common/hocs/withModule';
import { withView } from '@common/hocs/withView';
import RolesApi from '@common/api/roles/api';
import { RolesApiInjectKey } from '@/modules/roles/model/common/constants';
import RoleSelectView from './RoleSelectView';
import RoleSelectViewModel from './RoleSelectView.model';

const RoleSelectWithView = withView(RoleSelectView, RoleSelectViewModel);

export const RoleSelect = withModule({
  key: 'RoleSelectModule',
  component: RoleSelectWithView,
  providers: [
    {
      key: RolesApiInjectKey,
      provide: RolesApi,
    },
  ],
});
