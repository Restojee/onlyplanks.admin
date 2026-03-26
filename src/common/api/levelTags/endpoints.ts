export enum LevelTagEndpoints {
  Collect = 'Collect',
  GetById = 'GetById',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  Remove = 'Remove',
}

export const LevelTagUrls: Record<LevelTagEndpoints, string> = {
  [LevelTagEndpoints.Collect]: 'level-tags/collect',
  [LevelTagEndpoints.GetById]: 'level-tags/by-id',
  [LevelTagEndpoints.Create]: 'admin/level-tags/create',
  [LevelTagEndpoints.Update]: 'admin/level-tags/update',
  [LevelTagEndpoints.Delete]: 'admin/level-tags/delete',
  [LevelTagEndpoints.Remove]: 'admin/level-tags/remove',
};
