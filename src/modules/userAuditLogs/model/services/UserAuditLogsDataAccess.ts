import { injectable } from 'inversify';
import State from '@common/hocs/withView/decorators/State';
import EntityManager from '@common/store/entity/EntityManager';
import type { UserAuditLogData } from '@/modules/userAuditLogs/model/entities/types';

@injectable()
export class UserAuditLogsDataAccess {
  @State()
  public entityManager: EntityManager<UserAuditLogData> = new EntityManager({
    getRowId: (row) => row.id,
  });

  @State()
  public filterSearchText = '';

  @State()
  public filterActorUserId: number = undefined;

  @State()
  public filterTargetUserId: number = undefined;

  @State()
  public filterAction: string = undefined;

  public setAll(rows: UserAuditLogData[]) {
    this.entityManager.setAll(rows);
  }
}

export default UserAuditLogsDataAccess;
