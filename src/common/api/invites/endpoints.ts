export enum InviteEndpoints {
  Collect = 'Collect',
  Create = 'Create',
  Revoke = 'Revoke'
}

export const InviteUrls: Record<InviteEndpoints, string> = {
  [InviteEndpoints.Collect]: 'admin/invites/collect',
  [InviteEndpoints.Create]: 'admin/invites/create',
  [InviteEndpoints.Revoke]: 'admin/invites/revoke',
};
