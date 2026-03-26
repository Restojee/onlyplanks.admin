import { User } from '@common/api/tags/types';

export interface Level {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  text: string;
  createdUtcDate: string;
  
  user: User;
}

export interface CommentRowUser {
  id: number;
  username: string;
}

export interface CommentRow {
  id: number;
  text: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
  level: Level;
  user: CommentRowUser;
}

export interface PagedResult<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: T[];
}

export interface CollectCommentRequest {
  levelId?: number;
  userId?: number;
}

export type CollectCommentResponse = Comment[];

export interface CollectCommentPagedRequest {
  page: number;
  size: number;
  query?: string;
  levelId?: number;
  userId?: number;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type CollectCommentPagedResponse = PagedResult<CommentRow>;

export interface CreateCommentRequest {
  levelId: number;
  userId: number;
  text: string;
}

export type CreateCommentAdminRequest = CreateCommentRequest;

export type CreateCommentAdminResponse = CommentRow;

export interface UpdateCommentRequest {
  id: number;
  text: string;
}

export interface UpdateCommentAdminRequest {
  id: number;
  levelId?: number | null;
  userId?: number | null;
  text?: string | null;
}

export type UpdateCommentAdminResponse = CommentRow;

export interface DeleteCommentRequest {
  levelCommentId: number;
}

export interface DeleteCommentBulkRequest {
  ids: number[];
}

export interface DeleteCommentBulkResponse {}
