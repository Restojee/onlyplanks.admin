export enum TagEndpoints {
  Collect = 'Collect',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
}

export const TagUrls: Record<TagEndpoints, string> = {
  [TagEndpoints.Collect]: 'tags/collect',
  [TagEndpoints.Remove]: 'admin/tags/delete',
  [TagEndpoints.Create]: 'admin/tags/create',
  [TagEndpoints.Update]: 'admin/tags/update',
};
