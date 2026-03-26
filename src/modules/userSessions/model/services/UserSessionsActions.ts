import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import UserSessionsApi from '@common/api/userSessions/api';
import { UserSessionsApiInjectKey, UserSessionsDataAccessInjectKey } from '@/modules/userSessions/model/common/constants';
import type UserSessionsDataAccess from '@/modules/userSessions/model/services/UserSessionsDataAccess';
import type { UserSessionData } from '@/modules/userSessions/model/entities/types';
import type { QueryParams } from '@common/types/QueryParams';

@injectable()
export class UserSessionsActions {
  constructor(
    @inject(UserSessionsApiInjectKey) private api: UserSessionsApi,
    @inject(UserSessionsDataAccessInjectKey) private dataAccess: UserSessionsDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ userId?: number; success?: boolean; sortField?: string; sortDirection?: 'asc' | 'desc' }>,
  ): Promise<{ rows: UserSessionData[]; totalItems: number; totalPages: number; pageSize: number; page: number }> {
    const resp = await this.api.collect({
      page,
      size,
      query: filters?.query,
      userId: filters?.userId,
      success: filters?.success,
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
}

export default UserSessionsActions;
