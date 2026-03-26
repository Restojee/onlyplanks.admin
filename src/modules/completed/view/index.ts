import withModule from '@common/hocs/withModule';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import { CompletedActions, CompletedDataAccess } from '@/modules/completed/model/services';
import { CompletedActionsInjectKey, CompletedDataAccessInjectKey } from '@/modules/completed/model/common/constants';
import Completed from '@/modules/completed/view/components/Completed';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';

const CompletedModule = withModule({
  key: 'CompletedModule',
  component: Completed,
  providers: [
    {
      key: CompletedApiInjectKey,
      provide: CompletedApi,
    },
    {
      key: HttpConfigInjectKey,
      provide: HttpConfig,
    },
    {
      key: CompletedDataAccessInjectKey,
      provide: CompletedDataAccess,
    },
    {
      key: CompletedActionsInjectKey,
      provide: CompletedActions,
    },
  ]
});

export default CompletedModule;
