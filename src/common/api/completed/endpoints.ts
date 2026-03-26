export enum CompletedEndpoints {
  Collect = 'Collect',
  ByLevelId = 'ByLevelId',
  Create = 'Create',
  Update = 'Update',
  UpdateImage = 'UpdateImage',
  Delete = 'Delete',
}

export const CompletedUrls: Record<CompletedEndpoints, string> = {
  [CompletedEndpoints.Collect]: 'levels/completed/collect',
  [CompletedEndpoints.ByLevelId]: 'levels/completed/collect',
  [CompletedEndpoints.Create]: 'admin/levels/completed/create',
  [CompletedEndpoints.Update]: 'admin/levels/completed/update',
  [CompletedEndpoints.UpdateImage]: 'admin/levels/completed/update-image',
  [CompletedEndpoints.Delete]: 'admin/levels/completed/remove',
};
