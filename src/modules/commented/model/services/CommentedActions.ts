import { injectable, inject } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { CommentedDataAccess } from './CommentedDataAccess';
import { CommentedDataAccessInjectKey } from '../common/constants';
import type { CommentRow } from '@common/api/comments/models';
import type { QueryParams } from '@common/types/QueryParams';

@injectable()
export class CommentedActions {
  constructor(
    @inject(CommentedDataAccessInjectKey) private readonly dataAccess: CommentedDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ levelId?: number; userId?: number; sortField?: string; sortDirection?: 'asc' | 'desc' }>
  ): Promise<{ rows: CommentRow[]; totalItems: number; totalPages: number; pageSize: number; page: number; }> {
    const resp = await this.dataAccess.collectPaged({
      page,
      size,
      query: filters?.query,
      levelId: filters?.levelId,
      userId: filters?.userId,
      sortField: filters?.sortField,
      sortDirection: filters?.sortDirection,
    });

    this.dataAccess.setAll(resp.records);

    return {
      rows: resp.records,
      totalItems: resp.totalItems,
      totalPages: resp.totalPages,
      pageSize: resp.pageSize,
      page: resp.page,
    };
  }

  @AsyncAction()
  public async create(args: { levelId: number; userId: number; text: string; }): Promise<CommentRow> {
    const created = await this.dataAccess.createAdmin(args);
    this.dataAccess.create(created);
    return created;
  }

  @AsyncAction()
  public async update(args: { id: number; levelId?: number | null; userId?: number | null; text?: string | null; }): Promise<CommentRow> {
    const updated = await this.dataAccess.updateAdmin(args);
    this.dataAccess.update(updated.id, updated);
    return updated;
  }

  @AsyncAction()
  public async deleteBulk(ids: number[]): Promise<void> {
    await this.dataAccess.deleteBulk({ ids });
    ids.forEach(id => this.dataAccess.remove(id));
  }
}

export default CommentedActions;
