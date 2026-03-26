import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import type { Note } from '@common/api/notes/models';
import type { QueryParams } from '@common/types/QueryParams';
import NotesDataAccess from './NotesDataAccess';
import { NotesDataAccessInjectKey } from '../common/constants';

@injectable()
export class NotesActions {
  constructor(
    @inject(NotesDataAccessInjectKey) private readonly dataAccess: NotesDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ levelId?: number; userId?: number; sortField?: string; sortDirection?: 'asc' | 'desc' }>
  ): Promise<{ rows: Note[]; totalItems: number; totalPages: number; pageSize: number; page: number; }> {
    const resp = await this.dataAccess.collect({
      levelId: filters?.levelId,
      userId: filters?.userId,
      query: filters?.query,
      sortField: filters?.sortField,
      sortDirection: filters?.sortDirection,
    });

    const totalItems = resp.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / size));

    const start = (page - 1) * size;
    const rows = resp.slice(start, start + size);

    this.dataAccess.setAll(rows);

    return {
      rows,
      totalItems,
      totalPages,
      pageSize: size,
      page,
    };
  }

  @AsyncAction()
  public async create(args: { userId: number; levelId: number; description: string }): Promise<void> {
    await this.dataAccess.create({
      userId: args.userId,
      levelId: args.levelId,
      text: args.description,
    });
  }

  @AsyncAction()
  public async update(args: { id: number; userId?: number; levelId?: number; description?: string | null }): Promise<void> {
    await this.dataAccess.update({
      noteId: args.id,
      userId: args.userId,
      levelId: args.levelId,
      text: args.description ?? undefined,
    });
  }

  @AsyncAction()
  public async deleteBulk(ids: number[]): Promise<void> {
    await this.dataAccess.delete(ids);
  }
}

export default NotesActions;
