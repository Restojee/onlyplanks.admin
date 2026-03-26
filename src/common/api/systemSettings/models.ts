export interface SystemSettings {
  language: string;
  defaultRoleId?: number;
}

export interface UpdateSystemSettingsRequest {
  language?: string;
  defaultRoleId?: number;
}
