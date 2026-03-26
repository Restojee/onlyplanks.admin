import withModule from '@common/hocs/withModule';
import LevelCommentsManager from './components/LevelComments';
import { LevelCommentsDataAccess } from '../model/services/LevelCommentsDataAccess';
import { LevelCommentsActions } from '../model/services/LevelCommentsActions';
import { LevelCommentsDataAccessInjectKey, LevelCommentsActionsInjectKey } from '../model/common/constants';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';

const LevelCommentsModule = withModule({
  key: 'LevelCommentsModule',
  component: LevelCommentsManager,
  providers: [
    {
      key: CommentApiInjectKey,
      provide: CommentApi,
    },
    {
      key: LevelCommentsDataAccessInjectKey,
      provide: LevelCommentsDataAccess,
    },
    {
      key: LevelCommentsActionsInjectKey,
      provide: LevelCommentsActions,
    },
  ]
});

export default LevelCommentsModule;
