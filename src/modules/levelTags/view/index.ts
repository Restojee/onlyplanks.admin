import withModule from '@common/hocs/withModule';
import LevelTagsApi from '@common/api/levelTags/api';
import TagsApi from '@common/api/tags/api';
import LevelTags from '@/modules/levelTags/view/components/LevelTags';
import { LevelTagsActions, LevelTagsDataAccess } from '@/modules/levelTags/model/services';
import {
  LevelTagsActionsInjectKey,
  LevelTagsApiInjectKey,
  LevelTagsDataAccessInjectKey,
} from '@/modules/levelTags/model/common/constants';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';

const LevelTagsModule = withModule({
  key: 'LevelTagsModule',
  component: LevelTags,
  providers: [
    {
      key: LevelTagsApiInjectKey,
      provide: LevelTagsApi,
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
  ],
});

export default LevelTagsModule;
