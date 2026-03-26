export enum UserEndpoints {
  Me = 'Me',
  ByOne = 'ByOne',
  Collect = 'Collect',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  UpdateAvatar = 'UpdateAvatar',
}

export const UserUrls: Record<UserEndpoints, string> = {
  [UserEndpoints.Me]: 'users/me',
  [UserEndpoints.Collect]: 'users/collect',
  [UserEndpoints.ByOne]: 'users/by-one',
  [UserEndpoints.Create]: 'admin/users/create',
  [UserEndpoints.Update]: 'admin/users/update',
  [UserEndpoints.Delete]: 'admin/users',
  [UserEndpoints.UpdateAvatar]: 'users/update-my-avatar',
};
