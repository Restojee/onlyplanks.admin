import { injectable, inject } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import LevelTagsApi from '@common/api/levelTags/api';
import { LevelTagsApiInjectKey, LevelTagsDataAccessInjectKey } from '../common/constants';
import { LevelTagsDataAccess } from './LevelTagsDataAccess';
import type { LevelTagBindingData } from '../entities/types';
import type { LevelTagCreateArgs, LevelTagDeleteArgs, LevelTagUpdateArgs } from '@common/api/levelTags/types';
import type { QueryParams } from '@common/types/QueryParams';

@injectable()
export class LevelTagsActions {
  constructor(
    @inject(LevelTagsApiInjectKey) private api: LevelTagsApi,
    @inject(LevelTagsDataAccessInjectKey) private dataAccess: LevelTagsDataAccess
  ) {}

  @AsyncAction()
  public async loadPage(page: number, size: number, filters?: QueryParams<{ levelId?: number; tagId?: number; userId?: number; sortField?: string; sortDirection?: 'asc' | 'desc' }>): Promise<{ rows: LevelTagBindingData[]; totalItems: number; totalPages: number; pageSize: number; page: number; }> {
    const resp = await this.api.collect({
      page,
      size,
      query: filters?.query,
      levelId: filters?.levelId,
      tagId: filters?.tagId,
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
  public async remove(id: number): Promise<void> {
    await this.api.remove({ id });
    this.dataAccess.remove(id);
  }

  @AsyncAction()
  public async delete(args: LevelTagDeleteArgs): Promise<void> {
    await this.api.delete(args);
    this.dataAccess.remove(args.id);
  }

  @AsyncAction()
  public async create(args: LevelTagCreateArgs): Promise<LevelTagBindingData> {
    const created = await this.api.create(args);
    this.dataAccess.create(created);
    return created;
  }

  @AsyncAction()
  public async update(args: LevelTagUpdateArgs): Promise<LevelTagBindingData> {
    const updated = await this.api.update(args);
    this.dataAccess.update(updated.id, updated);
    return updated;
  }
}

export default LevelTagsActions;
