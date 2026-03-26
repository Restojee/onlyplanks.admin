import { inject } from 'inversify';
import { Action, AsyncAction, Computed, State, OnUnmounted } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { UserDataAccess, UserActions, UserDataAccessInjectKey, UserActionsInjectKey } from '@/modules/users/model/services';
import type { UserData, UserFormData } from '@/modules/users/model/entities';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import type { TreeNode } from '@ui/DataTreeTable';
import type { PaginationResponse, ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import type { UsersViewProps } from '@/modules/users/view/components/Users';
import { createUsersToolbarItems, getUserColumns } from '@/modules/users/view/components/utils';
import HttpConfig from '@common/http/HttpConfig';
import { HttpConfigInjectKey } from '@common/http/constants';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import UserContentModule from '@/modules/users/view/containers/UserContentModule';

class UsersModel extends ViewModel<UsersViewProps> {
  private contentManagerRef: ContentManagerRef  = null;

  @State()
  selectedRows: TreeNode<UserData>[] = [];

  @State()
  selectedRowId: string | number  = null;

  constructor(
    @inject(UserDataAccessInjectKey) public dataAccess: UserDataAccess,
    @inject(UserActionsInjectKey) public actions: UserActions,
    @inject(HttpConfigInjectKey) private readonly httpConfig: HttpConfig,
    @inject(AppServiceInjectKey) private appService: AppService
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.handleAvatarUpdate = this.handleAvatarUpdate.bind(this);
  }

  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  }

  private async reloadData(): Promise<void> {
    await this.contentManagerRef?.reloadData();
  }

  @Computed()
  public get pageTitle(): string {
    return 'Управление пользователями';
  }

  @Computed()
  public get tableColumns(): any[] {
    return getUserColumns({
      storageUrl: this.httpConfig.getConfig().storageUrl,
      onAvatarUpdate: this.handleAvatarUpdate,
    });
  }

  @Computed()
  public get getToolbarItems() {
    return createUsersToolbarItems({
      formState: this.dataAccess.userFormData,
      selectedRows: this.selectedRows,
      onAdd: this.handleCreateUser.bind(this),
      onEdit: this.handleEdit.bind(this),
      onDelete: this.handleDelete.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      onFormUsernameChange: (value) => this.handleFormFieldChange.call(this, 'username', value),
      onFormEmailChange: (value) => this.handleFormFieldChange.call(this, 'email', value),
      onFormPasswordChange: (value) => this.handleFormFieldChange.call(this, 'password', value),
      onFormRoleIdChange: (value) => this.handleFormFieldChange.call(this, 'roleId', value),
    });
  }

  public entityToTreeNode = (user: UserData) => {
    return { id: user.id, data: user };
  }

  @AsyncAction()
  public async loadUsers(page?: number, size?: number, sortField?: string, sortDirection?: 'asc' | 'desc'): Promise<PaginationResponse> {
    const result = await this.actions.loadUsers(page, size, sortField, sortDirection);
    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      pageSize: result.pageSize,
      page: result.page,
      data: result.data,
    };
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<UserData>[]): void => {
    this.selectedRows = rows;
  }

  @Action()
  public handleRowSelect = (row: TreeNode<UserData> ): void => {
    if (row) {
      this.selectedRowId = row.id;
      this.openUserSidebar(row);
    } else {
      this.selectedRowId = null;
    }
  }

  public openUserSidebar(user: TreeNode<UserData>): void {
    if (!user) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    const userId = user.data.id;
    this.appService.openRightSidebar(UserContentModule, `Пользователь ${user.data.username}`, {
      userId,
      onClose: () => {
        this.appService.closeRightSidebar();
        this.contentManagerRef?.reloadData();
      },
    });
  }

  @Action()
  public handleFormFieldChange(field: keyof UserFormData, value: string | number): void {
    Object.assign(this.dataAccess.userFormData, { [field]: value });
  }

  @Action()
  public handleFormCancel(): void {
    this.dataAccess.userFormData.username = '';
    this.dataAccess.userFormData.email = '';
    this.dataAccess.userFormData.password = '';
    this.dataAccess.userFormData.roleId = undefined;
  }

  @AsyncAction()
  public async handleCreateUser(): Promise<void> {
    const { username, email, password, roleId } = this.dataAccess.userFormData;
    await this.actions.createUser({ username, email, password, roleId });
    await this.reloadData();
    Notification.success('Успех', 'Пользователь добавлен');
    this.handleFormCancel();
  }

  public handleEdit = (users: TreeNode<UserData>[]): void => {
    if (!users || users.length === 0) {
      Notification.warning('Предупреждение', 'Не выбран пользователь для редактирования');
      return;
    }

    const selectedUser = users[0].data;
    this.openEditModal(selectedUser);
  }

  private openEditModal(user: UserData): void {
    
    
    const handleSave = async (id: number, data: Partial<UserData>) => {
      await this.actions.updateUser(id, data);
      await this.reloadData();
      Notification.success('Успех', 'Пользователь обновлён');
    };

    
    
    Notification.info('Редактирование', `Редактирование ${user.username} - используйте inline редактирование в таблице`);
  }

  @AsyncAction()
  async performDelete(users: TreeNode<UserData>[]): Promise<void> {
    await this.actions.deleteSelectedUsers(users);
    await this.reloadData();
    Notification.success('Успех', 'Пользователи удалены');
  }

  async handleDelete(users: TreeNode<UserData>[]): Promise<void> {
    if (!users || !users.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного пользователя');
      return;
    }

    showConfirm('Подтверждение удаления', {
      text: 'Вы уверены, что хотите удалить выбранных пользователей?',
      size: 'md',
      onSuccess: () => this.performDelete(users)
    });
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: string): Promise<void> {
    await this.actions.updateUser(rowId, { [columnId]: value });
    await this.reloadData();
  }

  @AsyncAction()
  public async handleAvatarUpdate(userId: number, file: File): Promise<void> {
    await this.actions.updateUserAvatar(userId, file);
    await this.reloadData();
    Notification.success('Успех', 'Аватар обновлён');
  }

  @Computed()
  public get userCollection() {
    return this.dataAccess.entityManager.getCollection;
  }

  @OnUnmounted()
  public cleanup(): void {
    this.appService.closeRightSidebar();
  }
}

export default UsersModel;
