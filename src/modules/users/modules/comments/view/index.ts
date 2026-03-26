import withModule from '@common/hocs/withModule';
import UserCommentsManager from './components/UserComments';
import { UserCommentsDataAccess } from '../model/services/UserCommentsDataAccess';
import { UserCommentsActions } from '../model/services/UserCommentsActions';
import { UserCommentsDataAccessInjectKey, UserCommentsActionsInjectKey } from '../model/common/constants';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';

const UserCommentsModule = withModule({
  key: 'UserCommentsModule',
  component: UserCommentsManager,
  providers: [
    {
      key: CommentApiInjectKey,
      provide: CommentApi,
    },
    {
      key: UserCommentsDataAccessInjectKey,
      provide: UserCommentsDataAccess,
    },
    {
      key: UserCommentsActionsInjectKey,
      provide: UserCommentsActions,
    },
  ]
});

export default UserCommentsModule;
