export enum UserAuditLogEndpoints {
  Collect = 'Collect',
}

export const UserAuditLogUrls: Record<UserAuditLogEndpoints, string> = {
  [UserAuditLogEndpoints.Collect]: 'admin/user-audit-logs/collect',
};
