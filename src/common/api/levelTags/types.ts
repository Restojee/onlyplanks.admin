export interface User {
  id: number;
  username: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface LevelTagBinding {
  id: number;
  level: Level;
  tag: Tag;
  user?: User;
  createdUtcDate?: string;
}

export interface PagedResult<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: T[];
}

export interface LevelTagCollectArgs {
  page: number;
  size: number;
  query?: string;
  levelId?: number;
  tagId?: number;
  userId?: number;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type LevelTagCollectResponse = PagedResult<LevelTagBinding>;

export interface LevelTagRemoveArgs {
  id: number;
}

export interface LevelTagRemoveResponse {}

export interface LevelTagGetByIdArgs {
  id: number;
}

export type LevelTagGetByIdResponse = LevelTagBinding;

export interface LevelTagCreateArgs {
  levelId: number;
  tagId: number;
  userId?: number;
}

export type LevelTagCreateResponse = LevelTagBinding;

export interface LevelTagUpdateArgs {
  id: number;
  levelId?: number ;
  tagId?: number ;
  userId?: number ;
}

export type LevelTagUpdateResponse = LevelTagBinding;

export interface LevelTagDeleteArgs {
  id: number;
}

export interface LevelTagDeleteResponse {}
