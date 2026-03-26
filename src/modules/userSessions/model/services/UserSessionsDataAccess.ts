import { injectable } from 'inversify';
import State from '@common/hocs/withView/decorators/State';
import EntityManager from '@common/store/entity/EntityManager';
import type { UserSessionData } from '@/modules/userSessions/model/entities/types';

@injectable()
export class UserSessionsDataAccess {
  @State()
  public entityManager: EntityManager<UserSessionData> = new EntityManager({
    getRowId: (row) => row.id,
  });

  @State()
  public filterSearchText = '';

  @State()
  public filterUserId: number = undefined;

  @State()
  public filterSuccess: boolean = undefined;

  public setAll(rows: UserSessionData[]) {
    this.entityManager.setAll(rows);
  }
}

export default UserSessionsDataAccess;
