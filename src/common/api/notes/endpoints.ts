export enum NotesEndpoints {
  Collect = 'collect',
  Create = 'create',
  Update = 'update',
  Remove = 'remove',
}

export const NotesUrls: Record<NotesEndpoints, string> = {
  [NotesEndpoints.Collect]: 'levels/notes/collect',
  [NotesEndpoints.Create]: 'admin/levels/notes/create',
  [NotesEndpoints.Update]: 'admin/levels/notes/update',
  [NotesEndpoints.Remove]: 'admin/levels/notes/remove',
};
