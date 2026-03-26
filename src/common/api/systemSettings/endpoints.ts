export enum SystemSettingsEndpoints {
  Get = 'Get',
  Update = 'Update',
}

export const SystemSettingsUrls: Record<SystemSettingsEndpoints, string> = {
  [SystemSettingsEndpoints.Get]: 'system-settings',
  [SystemSettingsEndpoints.Update]: 'system-settings',
};
