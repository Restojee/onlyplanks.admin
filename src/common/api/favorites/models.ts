import { User } from '@common/api/tags/types';
import { Level } from '@common/api/levels/models';
import type { Image } from '@common/api/storage/models';

export interface PagedResult<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: T[];
}

export interface Favorite {
  id: number;
  description: string;
  image?: Image;
  createdUtcDate: string;
  user: User;
  level: Level;
}

export interface CollectFavoriteRequest {
  levelId?: number;
  userId?: number;

  page?: number;
  size?: number;

  search?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type CollectFavoriteResponse = PagedResult<Favorite>

export interface CreateFavoriteRequest {
  levelIds: number[];
  userId: number;
}

export interface CreateFavoriteResponse {
  message: string;
}

export interface DeleteFavoriteRequest {
  LevelFavoriteIds: number[];
}

export interface DeleteFavoriteResponse {
  message: string;
}

export interface UpdateFavoriteRequest {
  favoriteId: number;
  userId?: number;
  levelId?: number;
  description?: string;
}

export type UpdateFavoriteResponse = Favorite;
