import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import { RolesService } from '@/modules/roles/model/services/RolesService';
import { RoleDataAccessInjectKey, RolesServiceInjectKey } from '@/modules/roles/model/common/constants';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { Modal } from '@ui/Modal/ModalEventBus';
import React from 'react';
import { RoleContent } from '@/modules/roles/modules/RoleContent';
import type { RoleData } from '@/modules/roles/model/entities/types';
import type { RolesGridProps } from './RolesGrid';

class RolesGridModel extends ViewModel<RolesGridProps> {
  @State()
  private createRoleModalId?: string;

  @State()
  private assignRoleModalId?: string;

  @State()
  private assignRoleId?: number;

  @State()
  private pendingDeleteRole?: RoleData;

  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess,
    @inject(RolesServiceInjectKey) private rolesService: RolesService,
    @inject(AppServiceInjectKey) private appService: AppService
  ) {
    super();

    this.loadRoles = this.loadRoles.bind(this);
    this.handleSelectRole = this.handleSelectRole.bind(this);
    this.handleDeselectRole = this.handleDeselectRole.bind(this);
    this.handleCreateRole = this.handleCreateRole.bind(this);
    this.handleRoleNameChange = this.handleRoleNameChange.bind(this);
    this.handleRoleDescriptionChange = this.handleRoleDescriptionChange.bind(this);
    this.handleRoleNameBlur = this.handleRoleNameBlur.bind(this);
    this.handleRoleDescriptionBlur = this.handleRoleDescriptionBlur.bind(this);
    this.handleSubmitCreateRole = this.handleSubmitCreateRole.bind(this);
    this.handleCancelCreateRole = this.handleCancelCreateRole.bind(this);
    this.performDelete = this.performDelete.bind(this);
    this.handleDeleteRole = this.handleDeleteRole.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleOpenAssignModal = this.handleOpenAssignModal.bind(this);
    this.handleAssignUserChange = this.handleAssignUserChange.bind(this);
    this.handleAssignUserBlur = this.handleAssignUserBlur.bind(this);
    this.handleSubmitAssignRole = this.handleSubmitAssignRole.bind(this);
    this.handleCancelAssignRole = this.handleCancelAssignRole.bind(this);
  }

  @OnMounted()
  onMounted(): void {
    this.loadRoles();
    this.appService.setPageTitle('Управление ролями')
  }

  @AsyncAction()
  async loadRoles(): Promise<void> {
    await this.rolesService.loadRoles(1, 100);
  }

  @Computed()
  public get roles(): RoleData[] {
    return this.dataAccess.entityManager.getCollection;
  }

  @Computed()
  public get selectedRole(): RoleData  {
    return this.dataAccess.selectedRole;
  }

  @Computed()
  public get pageTitle(): string {
    return 'Управление ролями';
  }

  @Computed()
  public get totalRoles(): number {
    return this.roles.length;
  }

  @Computed()
  public get totalUsers(): number {
    return this.roles.reduce((sum, role) => sum + (role.usersCount || 0), 0);
  }

  @Computed()
  public get activeModules(): number {
    return 5;
  }

  @Action()
  public handleSelectRole(role: RoleData): void {
    this.dataAccess.selectRole(role);
    
    this.appService.openRightSidebar(
      RoleContent,
      undefined,
      { role }
    );
  }

  @Action()
  public handleDeselectRole(): void {
    this.dataAccess.deselectRole();
    this.appService.closeRightSidebar();
  }

  @Action()
  public handleRoleNameChange(value: string): void {
    this.dataAccess.setRoleName(value);
  }

  @Action()
  public handleRoleDescriptionChange(value: string): void {
    this.dataAccess.setRoleDescription(value);
  }

  @Action()
  public async handleRoleNameBlur(): Promise<void> {
    await this.dataAccess.validateRoleName();
  }

  @Action()
  public async handleRoleDescriptionBlur(): Promise<void> {
    await this.dataAccess.validateRoleDescription();
  }

  @Action()
  public async handleCreateRole(): Promise<void> {
    this.dataAccess.resetRoleForm();
    const { RoleCreateForm } = await import('@/modules/roles/view/components/RoleCreateForm');

    const modalId = Modal.show('Создать новую роль', {
      size: 'md',
      component: RoleCreateForm,
      options: {
        formData: this.dataAccess.roleFormData,
        errors: this.dataAccess.roleFormErrors,
        onNameChange: this.handleRoleNameChange,
        onNameBlur: this.handleRoleNameBlur,
        onDescriptionChange: this.handleRoleDescriptionChange,
        onDescriptionBlur: this.handleRoleDescriptionBlur,
        onSubmit: this.handleSubmitCreateRole,
        onCancel: this.handleCancelCreateRole,
      },
    });

    this.createRoleModalId = modalId;
  }

  @AsyncAction()
  public async handleSubmitCreateRole(): Promise<void> {
    const isValid = await this.dataAccess.validateRoleForm();
    if (!isValid) {
      return;
    }
    const name = this.dataAccess.roleFormData.name?.trim();
    const description = this.dataAccess.roleFormData.description?.trim();

    const newRole = await this.rolesService.createRole({
      name,
      description: description,
    });

    if (this.createRoleModalId) {
      Modal.close(this.createRoleModalId);
      this.createRoleModalId = undefined;
    }

    Notification.success('Успех', `Роль "${newRole.name}" создана`);
  }

  @Action()
  public handleCancelCreateRole(): void {
    this.dataAccess.resetRoleForm();
    if (this.createRoleModalId) {
      Modal.close(this.createRoleModalId);
      this.createRoleModalId = undefined;
    }
  }

  @AsyncAction()
  public async handleEditRole(role: RoleData): Promise<void> {
    this.handleSelectRole(role);
  }

  @AsyncAction()
  public async performDelete(role: RoleData): Promise<void> {
    try {
      await this.rolesService.deleteRoles([role.id]);
      if (this.selectedRole?.id === role.id) {
        this.handleDeselectRole();
      }
      Notification.success('Успех', 'Роль удалена');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось удалить роль');
    }
  }

  public async handleDeleteRole(role: RoleData): Promise<void> {
    this.pendingDeleteRole = role;
    showConfirm('Подтверждение удаления', {
      text: `Вы уверены, что хотите удалить роль "${role.name}"?`,
      size: 'md',
      onSuccess: this.handleConfirmDelete,
    });
  }

  @AsyncAction()
  public async handleConfirmDelete(): Promise<void> {
    if (!this.pendingDeleteRole) {
      return;
    }

    const role = this.pendingDeleteRole;
    this.pendingDeleteRole = undefined;
    await this.performDelete(role);
  }

  @Action()
  public async handleOpenAssignModal(role: RoleData): Promise<void> {
    this.dataAccess.resetAssignForm();
    this.assignRoleId = role.id;

    const { RoleAssignForm } = await import('@/modules/roles/view/components/RoleAssignForm');

    this.assignRoleModalId = Modal.show(`Назначить роль: ${role.name}`, {
      size: 'md',
      component: RoleAssignForm,
      options: {
        roleName: role.name,
        formData: this.dataAccess.assignFormData,
        errors: this.dataAccess.assignFormErrors,
        onUserChange: this.handleAssignUserChange,
        onUserBlur: this.handleAssignUserBlur,
        onSubmit: this.handleSubmitAssignRole,
        onCancel: this.handleCancelAssignRole,
      },
    });
  }

  @Action()
  public handleAssignUserChange(userId: number): void {
    this.dataAccess.setAssignUserId(userId);
  }

  @Action()
  public async handleAssignUserBlur(): Promise<void> {
    await this.dataAccess.validateAssignUserId();
  }

  @AsyncAction()
  public async handleSubmitAssignRole(): Promise<void> {
    const isValid = await this.dataAccess.validateAssignForm();
    if (!isValid) {
      return;
    }

    const userId = this.dataAccess.assignFormData.userId;
    const roleId = this.assignRoleId;
    if (!roleId) {
      throw new Error('Role not selected');
    }

    await this.rolesService.assignRoleToUser(userId, roleId);
    Notification.success('Успех', 'Роль назначена пользователю');

    if (this.assignRoleModalId) {
      Modal.close(this.assignRoleModalId);
      this.assignRoleModalId = undefined;
    }
    this.assignRoleId = undefined;
    this.dataAccess.resetAssignForm();
  }

  @Action()
  public handleCancelAssignRole(): void {
    this.dataAccess.resetAssignForm();
    this.assignRoleId = undefined;
    if (this.assignRoleModalId) {
      Modal.close(this.assignRoleModalId);
      this.assignRoleModalId = undefined;
    }
  }
}

export default RolesGridModel;
