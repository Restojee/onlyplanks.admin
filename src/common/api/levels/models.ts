import { Tag, User } from '@common/api/tags/types';
import { Completed } from '@common/api/completed';
import type { Image } from '@common/api/storage/models';

export class Level {
  id: number;
  name: string;
  description?: string;
  image?: Image;
  createdUtcDate: string;
  modifiedUtcDate: string;
  user: User;
  tags: Tag[];
  completed: Completed[];
}

export class LevelByIdRequest { id: number; }
export class LevelByIdResponse extends Level {}

export class LevelRemoveRequest { id: number; }
export class LevelRemoveResponse {}

export class LevelCreateRequest { name: string; description?: string; }
export class LevelCreateResponse extends Level {}

export class LevelUpdateRequest { id: number; name?: string; description?: string; }
export class LevelUpdateResponse extends Level {}

export class LevelUpdateImageRequest {
  id: number;
  image: File;
}

export class LevelCollectRequest {
  page?: number;
  size?: number;
  ids?: number[];
  name?: string;
  description?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';

  userId?: number;
  isCompleted?: boolean;
  isFavorite?: boolean;
  isCreatedByUser?: boolean;
  isWithComment?: boolean;
}
export class LevelCollectResponse { 
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: Array<Level>;
}

export class LevelCompletedCreateRequest { levelId: number; userId: number; file: Blob; }
export class LevelCompletedDeleteRequest { levelCompletedIds: number[]; }
export class LevelFavoriteDeleteRequest { levelFavoriteIds: number[]; }
export class LevelTagCollectRequest { levelId: number; }
export class LevelTagCollectResponse { data: Tag[]; }
export class LevelTagCreateRequest { tagIds: number[]; levelIds: number[]; userId?: number; }
export class LevelTagCreateResponse {}
export class LevelTagDeleteRequest { levelTagIds: number[]; levelId?: number; }
export class LevelTagDeleteResponse {}
