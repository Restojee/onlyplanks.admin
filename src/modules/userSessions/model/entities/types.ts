export interface UserSessionData {
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
