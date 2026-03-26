export enum LevelEndpoints {
  Collect = 'Collect',
  ById = 'ById',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
  UpdateImage = 'UpdateImage',
  FavoriteDelete = 'FavoriteDelete',
  CompletedCreate = 'CompletedCreate',
  CompletedDelete = 'CompletedDelete',
  TagCollect = 'TagCollect',
  TagCreate = 'TagCreate',
  TagDelete = 'TagDelete',
}

export const LevelUrls: Record<LevelEndpoints, string> = {
  [LevelEndpoints.Collect]: 'levels/collect',
  [LevelEndpoints.ById]: 'levels/by-id',
  [LevelEndpoints.Remove]: 'admin/levels/remove',
  [LevelEndpoints.Create]: 'admin/levels/create',
  [LevelEndpoints.Update]: 'admin/levels/update',
  [LevelEndpoints.UpdateImage]: 'admin/levels',
  [LevelEndpoints.FavoriteDelete]: 'admin/levels/favorite/remove',
  [LevelEndpoints.CompletedCreate]: 'admin/levels/completed/create',
  [LevelEndpoints.CompletedDelete]: 'admin/levels/completed/remove',
  [LevelEndpoints.TagCollect]: 'level-tags/collect',
  [LevelEndpoints.TagCreate]: 'admin/levels/tags/create',
  [LevelEndpoints.TagDelete]: 'admin/levels/tags/remove',
};
