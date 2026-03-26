import { injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { InviteData, InviteFormData } from '@/modules/invites/model/entities/types';

@injectable()
export class InviteDataAccess {

  @State()
  public inviteFormData: InviteFormData;

  @State()
  private readonly _entityManager: EntityManager<InviteData>;

  constructor() {
    this._entityManager = new EntityManager<InviteData>({
      getRowId: invite => invite.id,
    });

    this.inviteFormData = { email: '' };
  }

  @Computed()
  public get entityManager(): EntityManager<InviteData> {
    return this._entityManager;
  }

  @Action()
  public add(invite: InviteData): void {
    this._entityManager.create(invite);
  }

  @Action()
  public removeMany(ids: number[]): void {
    ids.forEach(id => this._entityManager.remove(id));
  }
}

export default InviteDataAccess;
