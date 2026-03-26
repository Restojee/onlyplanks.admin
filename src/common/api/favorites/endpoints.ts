export enum FavoriteEndpoints {
  Collect = 'Collect',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export const FavoriteUrls: Record<FavoriteEndpoints, string> = {
  [FavoriteEndpoints.Collect]: 'levels/favorite/collect',
  [FavoriteEndpoints.Create]: 'admin/levels/favorite/create',
  [FavoriteEndpoints.Delete]: 'admin/levels/favorite/remove',
  [FavoriteEndpoints.Update]: 'admin/levels/favorite/update',
};
