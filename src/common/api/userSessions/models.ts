export interface UserSession {
  id: number;
  userId?: number;
  userName?: string;
  ip?: string;
  userAgent?: string;
  device?: string;
  success: boolean;
  failureReason?: string;
  createdUtcDate?: string;
}

export interface CollectUserSessionsRequest {
  page: number;
  size: number;
  userId?: number;
  success?: boolean;
  query?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface CollectUserSessionsResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: UserSession[];
}
