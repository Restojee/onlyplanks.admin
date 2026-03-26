export interface UserAuditLog {
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

export interface CollectUserAuditLogsRequest {
  page: number;
  size: number;
  actorUserId?: number;
  targetUserId?: number;
  action?: string;
  query?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface CollectUserAuditLogsResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: UserAuditLog[];
}
