import { UserData } from '@/modules/levels/common/types';
import type { Image } from '@common/api/storage/models';

export interface CompletedData {
  id: number;
  description: string;
  image?: Image;
  createdUtcDate: string;
  user?: UserData;
}

