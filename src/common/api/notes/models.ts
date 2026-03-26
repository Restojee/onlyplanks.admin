import type { User } from '@common/api/tags/types';
import type { Level } from '@common/api/levels/models';

export interface Note {
  id: number;
  text: string;
  description?: string;
  createdUtcDate: string;
  user: User;
  level: Level;
}

export interface CollectNotesRequest {
  userId?: number;
  levelId?: number;
  query?: string;

  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type CollectNotesResponse = Note[];

export interface CreateNoteRequest {
  userId: number;
  levelId: number;
  text: string;
}

export type CreateNoteResponse = Note;

export interface UpdateNoteRequest {
  noteId: number;
  userId?: number;
  levelId?: number;
  text?: string;
}

export type UpdateNoteResponse = Note;

export interface RemoveNotesRequest {
  noteIds: number[];
}

export type RemoveNotesResponse = string;
