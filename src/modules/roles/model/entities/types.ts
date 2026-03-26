export interface PolicyPermission {
  key: string;
  label: string;
  granted: boolean;
}

export type PolicyGroupType = 'Moder' | 'Owner' | 'System';

export interface PolicyInfo {
  key: string;
  name: string;
  label: string;
  group: PolicyGroupType;
  permissions: PolicyPermission[];
}

export interface RoleFormData {
  name: string;
  description: string;
}

export interface RoleData {
  id: number;
  name: string;
  description?: string;
  policies?: PolicyInfo[];
  permissionsCount?: number;
  createdUtcDate?: string;
  usersCount?: number;
}

export interface UserRoleAssignment {
  userId: number;
  roleId: number;
}
