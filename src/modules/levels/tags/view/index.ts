import withModule from '@common/hocs/withModule';
import LevelTagsManager from './components/LevelTags';
import { LevelTagsDataAccess } from '../model/services/LevelTagsDataAccess';
import { LevelTagsActions } from '../model/services/LevelTagsActions';
import { LevelTagsDataAccessInjectKey, LevelTagsActionsInjectKey } from '../model/common/constants';
import { LevelsApiInjectKey } from '@/modules/levels/model/common/constants';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import LevelsApi from '@common/api/levels';
import TagsApi from '@common/api/tags/api';

const LevelTagsModule = withModule({
  key: 'LevelTagsModule',
  component: LevelTagsManager,
  providers: [
    {
      key: LevelsApiInjectKey,
      provide: LevelsApi,
    },
    {
      key: TagsApiInjectKey,
      provide: TagsApi,
    },
    {
      key: LevelTagsDataAccessInjectKey,
      provide: LevelTagsDataAccess,
    },
    {
      key: LevelTagsActionsInjectKey,
      provide: LevelTagsActions,
    },
  ]
});

export default LevelTagsModule;
