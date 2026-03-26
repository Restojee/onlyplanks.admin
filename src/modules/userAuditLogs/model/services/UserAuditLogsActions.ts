import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import UserAuditLogsApi from '@common/api/userAuditLogs/api';
import { UserAuditLogsApiInjectKey, UserAuditLogsDataAccessInjectKey } from '@/modules/userAuditLogs/model/common/constants';
import type UserAuditLogsDataAccess from '@/modules/userAuditLogs/model/services/UserAuditLogsDataAccess';
import type { UserAuditLogData } from '@/modules/userAuditLogs/model/entities/types';
import type { QueryParams } from '@common/types/QueryParams';

@injectable()
export class UserAuditLogsActions {
  constructor(
    @inject(UserAuditLogsApiInjectKey) private api: UserAuditLogsApi,
    @inject(UserAuditLogsDataAccessInjectKey) private dataAccess: UserAuditLogsDataAccess,
  ) {}

  @AsyncAction()
  public async loadPage(
    page: number,
    size: number,
    filters?: QueryParams<{ actorUserId?: number; targetUserId?: number; action?: string; sortField?: string; sortDirection?: 'asc' | 'desc' }>,
  ): Promise<{ rows: UserAuditLogData[]; totalItems: number; totalPages: number; pageSize: number; page: number }> {
    const resp = await this.api.collect({
      page,
      size,
      query: filters?.query,
      actorUserId: filters?.actorUserId,
      targetUserId: filters?.targetUserId,
      action: filters?.action,
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

export default UserAuditLogsActions;
