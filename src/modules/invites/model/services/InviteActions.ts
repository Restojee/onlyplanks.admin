import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import InviteApi from '@common/api/invites/api';
import { InvitesApiInjectKey, InviteDataAccessInjectKey } from '@/modules/invites/model/common/constants';
import type InviteDataAccess from '@/modules/invites/model/services/InviteDataAccess';
import type { InviteData, InviteFormData } from '@/modules/invites/model/entities/types';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Invite } from '@common/api/invites/models';

@injectable()
export class InviteActions {
  constructor(
    @inject(InvitesApiInjectKey) private invitesApi: InviteApi,
    @inject(InviteDataAccessInjectKey) private dataAccess: InviteDataAccess,
  ) {}

  @AsyncAction()
  public async loadInvites(): Promise<InviteData[]> {
    const response = await this.invitesApi.collect();

    const invites: InviteData[] = (response as Invite[]).map((i) => ({
      id: i.id,
      token: i.token,
      email: i.email,
      expirationDate: i.expirationDate,
      isUsed: i.isUsed,
      createdUtcDate: i.createdUtcDate,
      modifiedUtcDate: i.modifiedUtcDate,
      createdByUser: i.createdByUser,
      registeredUser: i.registeredUser,
    }));

    this.dataAccess.entityManager.setAll(invites);
    return invites;
  }

  @AsyncAction()
  public async createInvite(data: InviteFormData): Promise<InviteData> {
    const response = await this.invitesApi.createInvite({ email: data.email });

    const invite: InviteData = {
      id: response.id,
      token: response.token,
      email: response.email,
      expirationDate: response.expirationDate,
      isUsed: response.isUsed,
      createdUtcDate: response.createdUtcDate,
      modifiedUtcDate: response.modifiedUtcDate,
      createdByUser: response.createdByUser,
      registeredUser: response.registeredUser,
    };

    this.dataAccess.add(invite);
    return invite;
  }

  @AsyncAction()
  public async revokeInvites(ids: number[]): Promise<void> {
    await this.invitesApi.revokeInvites({ ids });
    this.dataAccess.removeMany(ids);
  }

  @AsyncAction()
  public async revokeSelectedInvites(selectedRows: TreeNode<InviteData>[]): Promise<void> {
    const ids = selectedRows.map(r => r.data.id);
    await this.revokeInvites(ids);
  }
}

export default InviteActions;
