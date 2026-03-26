import { injectable, inject } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import type { Completed } from '@common/api/completed/models';
import { CompletedDataAccess } from './CompletedDataAccess';
import { CompletedDataAccessInjectKey } from '../common/constants';
import type { QueryParams } from '@common/types/QueryParams';

@injectable()
export class CompletedActions {
  constructor(
    @inject(CompletedDataAccessInjectKey) private readonly dataAccess: CompletedDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ levelId?: number; userId?: number; sortField?: string; sortDirection?: 'asc' | 'desc' }>
  ): Promise<{ rows: Completed[]; totalItems: number; totalPages: number; pageSize: number; page: number; }> {
    const resp = await this.dataAccess.collect({
      page,
      size,
      levelId: filters?.levelId,
      userId: filters?.userId,
      search: filters?.query,
      sortField: filters?.sortField,
      sortDirection: filters?.sortDirection,
    });

    const rows = resp.records;
    this.dataAccess.setAll(rows);

    return {
      rows,
      totalItems: resp.totalItems,
      totalPages: resp.totalPages,
      pageSize: resp.pageSize,
      page: resp.page,
    };
  }

  @AsyncAction()
  public async create(args: { levelId: number; userId: number; description: string; image?: File | null; }): Promise<Completed> {
    const created = await this.dataAccess.createCompleted({
      levelId: args.levelId,
      userId: args.userId,
      description: args.description,
    });

    if (args.image) {
      await this.dataAccess.updateCompletedImage({ id: created.id, image: args.image });
    }
    return created;
  }

  @AsyncAction()
  public async update(args: { id: number; description?: string | null; userId?: number; levelId?: number }): Promise<void> {
    await this.dataAccess.updateCompleted({
      completedId: args.id,
      description: args.description ?? undefined,
      userId: args.userId,
      levelId: args.levelId,
    });
  }

  @AsyncAction()
  public async updateImage(args: { id: number; image: File; }): Promise<void> {
    await this.dataAccess.updateCompletedImage({ id: args.id, image: args.image });
  }

  @AsyncAction()
  public async deleteBulk(ids: number[]): Promise<void> {
    await this.dataAccess.deleteCompleted({ levelCompletedIds: ids });
    ids.forEach(id => this.dataAccess.remove(id));
  }
}

export default CompletedActions;
