import withModule from '@common/hocs/withModule';
import { withView } from '@common/hocs/withView';
import TagsApi from '@common/api/tags/api';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import TagSelectView from './TagSelectView';
import TagSelectViewModel from './TagSelectView.model';

const TagSelectWithView = withView(TagSelectView, TagSelectViewModel);

export const TagSelect = withModule({
  key: 'TagSelectModule',
  component: TagSelectWithView,
  providers: [
    {
      key: TagsApiInjectKey,
      provide: TagsApi,
    },
  ]
});
