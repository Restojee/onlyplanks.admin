export enum RoleEndpoints {
  Collect = 'Collect',
  Get = 'Get',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  SetPermissions = 'SetPermissions',
  AssignToUser = 'AssignToUser',
}

export const RoleUrls: Record<RoleEndpoints, string> = {
  [RoleEndpoints.Collect]: 'admin/roles/collect',
  [RoleEndpoints.Get]: 'admin/roles',
  [RoleEndpoints.Create]: 'admin/roles/create',
  [RoleEndpoints.Update]: 'admin/roles/update',
  [RoleEndpoints.Delete]: 'admin/roles',
  [RoleEndpoints.SetPermissions]: 'admin/roles/permissions/set',
  [RoleEndpoints.AssignToUser]: 'admin/roles/assign-to-user',
};
