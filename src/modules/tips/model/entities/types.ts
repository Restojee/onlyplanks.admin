import type { UserData } from '@/modules/levels/common/types';

export interface TipFormData {
  title: string;
  text: string;
}

export interface TipData {
  id: number;
  title: string;
  text: string;
  createdUtcDate?: string,
  modifiedUtcDate?: string,
  user?: UserData;
}
