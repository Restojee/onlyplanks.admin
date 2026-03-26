import withModule from '@common/hocs/withModule';
import Tags from '@/modules/tags/view/components/Tags';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import TagsApi from '@common/api/tags/api';
import { TagActions, TagActionsInjectKey, TagDataAccess, TagDataAccessInjectKey } from '@/modules/tags/model/services';

const TagModule = withModule({
  key: 'TagsModule',
  component: Tags,
  providers: [
    {
      key: TagsApiInjectKey,
      provide: TagsApi,
    },
    {
      key: TagDataAccessInjectKey,
      provide: TagDataAccess,
    },
    {
      key: TagActionsInjectKey,
      provide: TagActions,
    },
  ]
})

export default TagModule;
