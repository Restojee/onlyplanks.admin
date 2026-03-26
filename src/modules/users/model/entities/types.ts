export interface UserRole {
  id: number;
  name: string;
}

export interface UserFormData {
  username: string;
  email: string;
  password: string;
  roleId?: number;
}

export interface UserData {
  id: number;
  avatar?: string;
  username: string;
  email?: string;
  role?: UserRole;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
}
