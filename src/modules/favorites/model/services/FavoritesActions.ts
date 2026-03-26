import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import type { Favorite } from '@common/api/favorites/models';
import type { QueryParams } from '@common/types/QueryParams';
import FavoritesDataAccess from './FavoritesDataAccess';
import { FavoritesDataAccessInjectKey } from '../common/constants';

@injectable()
export class FavoritesActions {
  constructor(
    @inject(FavoritesDataAccessInjectKey) private readonly dataAccess: FavoritesDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ levelId?: number; userId?: number; sortField?: string; sortDirection?: 'asc' | 'desc' }>
  ): Promise<{ rows: Favorite[]; totalItems: number; totalPages: number; pageSize: number; page: number; }> {
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
  public async update(args: { id: number; userId?: number; levelId?: number; description?: string | null }): Promise<void> {
    await this.dataAccess.update({
      favoriteId: args.id,
      userId: args.userId,
      levelId: args.levelId,
      description: args.description ?? undefined,
    });
  }

  @AsyncAction()
  public async create(args: { userId: number; levelId: number }): Promise<void> {
    await this.dataAccess.create({
      userId: args.userId,
      levelIds: [args.levelId],
    });
  }

  @AsyncAction()
  public async deleteBulk(ids: number[]): Promise<void> {
    await this.dataAccess.delete(ids);
  }
}

export default FavoritesActions;
