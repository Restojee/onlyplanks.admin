export interface UserRole {
  id: number;
  name: string;
}

export interface User {
  id: number;
  avatar?: string;
  username: string;
  email?: string;
  role?: UserRole;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
}

export interface MeResponse extends User{}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  roleId?: number;
}
export interface CreateUserResponse extends User {}

export interface UpdateUserRequest {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
  roleId?: number;
}
export interface UpdateUserResponse extends User {}

export interface UpdateUserAvatarRequest {
  id: number;
}
export interface UpdateUserAvatarResponse extends User {}

export interface DeleteUserResponse {}
export interface CollectUsersRequest {
  size: number;
  page: number;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}
export interface CollectUsersResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: User[];
}
