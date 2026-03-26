import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { TreeNode } from '@ui/DataTreeTable';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { InviteActions, InviteDataAccess, InviteActionsInjectKey, InviteDataAccessInjectKey } from '@/modules/invites/model/services';
import type { InviteData, InviteFormData } from '@/modules/invites/model/entities/types';
import { getInviteColumns } from '@/modules/invites/view/utils/columns';
import { getInviteToolbarItems } from '@/modules/invites/view/utils/toolbarItems';
import type { InvitesProps } from './Invites';

class InvitesModel extends ViewModel<InvitesProps> {

  @State()
  public selectedRows: TreeNode<InviteData>[] = [];

  @State()
  public selectedRowId: string | number  = null;

  constructor(
    @inject(InviteDataAccessInjectKey) public dataAccess: InviteDataAccess,
    @inject(InviteActionsInjectKey) public actions: InviteActions,
  ) {
    super();
  }

  @OnMounted()
  @AsyncAction()
  public async loadInvites(): Promise<void> {
    await this.actions.loadInvites();
  }

  @Computed()
  public get pageTitle(): string {
    return 'Инвайты';
  }

  @Computed()
  public get tableColumns(): any[] {
    return getInviteColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getInviteToolbarItems({
      formState: this.dataAccess.inviteFormData,
      selectedRows: this.selectedRows,
      onCreate: this.handleCreateInvite.bind(this),
      onRevoke: this.handleRevoke.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      onFormEmailChange: (value) => this.handleFormFieldChange('email', value),
    });
  }

  public entityToTreeNode = (invite: InviteData) => ({
    id: invite.id,
    data: invite,
  });

  @Computed()
  public get inviteCollection(): InviteData[] {
    return this.dataAccess.entityManager.getCollection;
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<InviteData>[]): void => {
    this.selectedRows = rows;
  }

  @Action()
  public handleRowSelect = (row: TreeNode<InviteData> ): void => {
    this.selectedRowId = row ? row.id : null;
  }

  @Action()
  public handleFormFieldChange(field: keyof InviteFormData, value: string): void {
    this.dataAccess.inviteFormData[field] = value;
  }

  @Action()
  public handleFormCancel = (): void => {
    this.dataAccess.inviteFormData.email = '';
  }

  @AsyncAction()
  public async handleCreateInvite(): Promise<void> {
    const email = this.dataAccess.inviteFormData.email;
    if (!email) {
      Notification.warning('Предупреждение', 'Укажите email');
      return;
    }
    try {
      await this.actions.createInvite({ email });
      Notification.success('Успех', 'Инвайт создан');
      this.handleFormCancel();
      await this.actions.loadInvites();
    } catch (e: any) {
      Notification.error('Ошибка', e?.message || 'Не удалось создать инвайт');
    }
  }

  @AsyncAction()
  private async performRevoke(invites: TreeNode<InviteData>[]): Promise<void> {
    await this.actions.revokeSelectedInvites(invites);
    Notification.success('Успех', 'Инвайты отозваны');
  }

  public handleRevoke = async (invites: TreeNode<InviteData>[]): Promise<void> => {
    if (!invites || invites.length === 0) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного инвайта');
      return;
    }

    showConfirm('Подтверждение', {
      text: 'Отозвать выбранные инвайты? Пользователи не смогут зарегистрироваться по ним.',
      size: 'md',
      onSuccess: () => this.performRevoke(invites),
    });
  }
}

export default InvitesModel;
