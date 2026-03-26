import withModule from '@common/hocs/withModule';
import TipsApi from '@common/api/tips/api';
import { TipActions, TipActionsInjectKey, TipDataAccess, TipDataAccessInjectKey } from '@/modules/tips/model/services';
import { TipsApiInjectKey } from '@/modules/tips/model/common/constants';
import { withView } from '@common/hocs/withView';
import Tips from '@/modules/tips/view/components/Tips';
import TipsModel from '@/modules/tips/view/components/Tips.model';

const TipsView = withView(Tips, TipsModel);

const TipModule = withModule({
  key: 'TipsModule',
  component: TipsView,
  providers: [
    {
      key: TipsApiInjectKey,
      provide: TipsApi,
    },
    {
      key: TipDataAccessInjectKey,
      provide: TipDataAccess,
    },
    {
      key: TipActionsInjectKey,
      provide: TipActions,
    },
  ]
})

export default TipModule;
