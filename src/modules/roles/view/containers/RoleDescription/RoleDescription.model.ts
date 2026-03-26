import { inject } from 'inversify';
import { Action, AsyncAction, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import {
  RoleDataAccessInjectKey,
  RolesServiceInjectKey,
} from '@/modules/roles/model/common/constants';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import { Notification } from '@ui/Notification';
import type { RoleContentProps } from './RoleDescription';
import { RolesService } from '@/modules/roles/model/services';

class RoleDescriptionModel extends ViewModel<RoleContentProps> {
  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess,
    @inject(RolesServiceInjectKey) private actions: RolesService,
    @inject(AppServiceInjectKey) private appService: AppService
  ) {
    super();
  }

  @Computed()
  public get role() {
    return this.props.role;
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
  public handlePoliciesChange = (policies: any[]): void => {
    this.dataAccess.updateEditedPolicies(policies);
  };

  @AsyncAction()
  public async handleSave(): Promise<void> {
    if (!this.role) return;

    try {
      await this.actions.updateRolePolicies(this.role.id, this.policies);
      Notification.success('Успех', 'Права доступа обновлены');
      this.appService.closeRightSidebar();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось обновить права доступа');
    }
  }

  @Action()
  public handleCancel = (): void => {
    this.dataAccess.resetEditedPolicies();
    this.appService.closeRightSidebar();
  };
}

export default RoleDescriptionModel;
