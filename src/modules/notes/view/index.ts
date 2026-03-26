import withModule from '@common/hocs/withModule';
import Notes from '@/modules/notes/view/components/Notes';
import NotesApi from '@common/api/notes/api';
import { NotesApiInjectKey, NotesActionsInjectKey, NotesDataAccessInjectKey } from '@/modules/notes/model/services';
import { NotesActions, NotesDataAccess } from '@/modules/notes/model/services';

const NotesModule = withModule({
  key: 'NotesModule',
  component: Notes,
  providers: [
    {
      key: NotesApiInjectKey,
      provide: NotesApi,
    },
    {
      key: NotesDataAccessInjectKey,
      provide: NotesDataAccess,
    },
    {
      key: NotesActionsInjectKey,
      provide: NotesActions,
    },
  ]
});

export default NotesModule;
