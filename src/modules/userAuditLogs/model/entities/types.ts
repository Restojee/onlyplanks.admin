export interface UserAuditLogData {
  id: number;
  actorUserId?: number;
  actorUserName?: string;
  targetUserId?: number;
  targetUserName?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  ip?: string;
  userAgent?: string;
  metadataJson?: string;
  createdUtcDate?: string;
}
