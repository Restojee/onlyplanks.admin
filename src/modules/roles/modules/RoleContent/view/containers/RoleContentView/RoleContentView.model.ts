import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import { RolesService } from '@/modules/roles/model/services/RolesService';
import { RoleDataAccessInjectKey, RolesServiceInjectKey } from '@/modules/roles/model/common/constants';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import { Notification } from '@ui/Notification';
import type { RoleContentViewProps } from './RoleContentView';

class RoleContentViewModel extends ViewModel<RoleContentViewProps> {
  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess,
    @inject(RolesServiceInjectKey) private rolesService: RolesService,
    @inject(AppServiceInjectKey) private appService: AppService
  ) {
    super();

    this.handlePoliciesChange = this.handlePoliciesChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  @OnMounted()
  onMounted(): void {
    this.loadDetails();
  }

  @AsyncAction()
  private async loadDetails(): Promise<void> {
    if (!this.props.role) return;

    try {
      await this.rolesService.loadRoleDetails(this.props.role.id);
    } catch (e) {
      Notification.error('Ошибка', 'Не удалось загрузить данные роли');
      this.dataAccess.selectRole(this.props.role);
    }
  }

  @Computed()
  public get role() {
    return this.dataAccess.selectedRole || this.props.role;
  }

  @Computed()
  public get policies() {
    return this.dataAccess.editedPolicies;
  }

  @Computed()
  public get hasChanges(): boolean {
    return this.dataAccess.hasPolicyChanges;
  }

  @Action()
  public handlePoliciesChange(policies: any[]): void {
    this.dataAccess.updateEditedPolicies(policies);
  }

  @AsyncAction()
  public async handleSave(): Promise<void> {
    if (!this.role) return;

    try {
      await this.rolesService.updateRolePolicies(this.role.id, this.policies);
      Notification.success('Успех', 'Права доступа обновлены');
      this.appService.closeRightSidebar();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось обновить права доступа');
    }
  }

  @Action()
  public handleCancel(): void {
    this.dataAccess.resetEditedPolicies();
    this.appService.closeRightSidebar();
  }
}

export default RoleContentViewModel;
