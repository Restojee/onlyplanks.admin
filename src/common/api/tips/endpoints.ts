export enum TipEndpoints {
  Collect = 'Collect',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
}

export const TipUrls: Record<TipEndpoints, string> = {
  [TipEndpoints.Collect]: 'tips/collect',
  [TipEndpoints.Remove]: 'admin/tips/delete',
  [TipEndpoints.Create]: 'admin/tips/create',
  [TipEndpoints.Update]: 'admin/tips/update',
};
