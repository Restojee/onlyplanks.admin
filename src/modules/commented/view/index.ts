import withModule from '@common/hocs/withModule';
import Commented from '@/modules/commented/view/components/Commented';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey, AppServiceInjectKey } from '@/constants';
import { CommentedActions, CommentedDataAccess } from '@/modules/commented/model/services';
import {
  CommentedActionsInjectKey,
  CommentedDataAccessInjectKey,
} from '@/modules/commented/model/common/constants';
import { AppService } from '@common/services/app';

const CommentedModule = withModule({
  key: 'CommentedModule',
  component: Commented,
  providers: [
    {
      key: CommentApiInjectKey,
      provide: CommentApi,
    },
    {
      key: CommentedDataAccessInjectKey,
      provide: CommentedDataAccess,
    },
    {
      key: CommentedActionsInjectKey,
      provide: CommentedActions,
    },
  ],
});

export default CommentedModule;
