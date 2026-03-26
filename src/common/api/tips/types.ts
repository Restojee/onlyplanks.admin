import type { UserData } from '@/modules/levels/common/types';

export interface TipCollectArgs {
  page?: number;
  size?: number;
  search?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TipCollectResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: Tip[];
}

export interface Tip {
  id: number;
  title: string;
  text: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
  user?: UserData;
}

export interface TipCreateArgs {
  title: string;
  text: string;
}

export interface TipCreateResponse {
  id: number;
  title: string;
  text: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
  user: UserData;
}

export interface TipUpdateArgs {
  id: number;
  title: string;
  text: string;
}

export interface TipUpdateResponse {
  id: number;
  title: string;
  text: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
}

export interface TipRemoveArgs {
  tipId: number;
}

export interface TipRemoveResponse {}
