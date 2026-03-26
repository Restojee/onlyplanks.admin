import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { TreeNode } from '@ui/DataTreeTable';
import { UserDataAccessInjectKey, UsersApiInjectKey } from '@/modules/users/model/common/constants';
import UserDataAccess from '@/modules/users/model/services/UserDataAccess';
import UserApi from '@common/api/users/api';
import type { UserData, UserFormData } from '@/modules/users/model/entities/types';
import type {UpdateUserRequest, User} from '@common/api/users/models';

@injectable()
export class UserActions {

  constructor(
    @inject(UserDataAccessInjectKey) private dataAccess: UserDataAccess,
    @inject(UsersApiInjectKey) private usersApi: UserApi
  ) {}

  @AsyncAction()
  public async loadUsers(page: number, size: number, sortField?: string, sortDirection?: 'asc' | 'desc'): Promise<{
    data: UserData[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }> {
    const response = await this.usersApi.collect({ page, size, sortField, sortDirection });

    const users: UserData[] = response.records.map((item: User) => ({
      id: item.id,
      username: item.username,
      email: item.email,
      role: item.role,
      avatar: item.avatar,
      createdUtcDate: item.createdUtcDate,
      modifiedUtcDate: item.modifiedUtcDate,
    }));

    if (page === 1) {
      this.dataAccess.setMany(response.records);
    } else {
      this.dataAccess.addMany(response.records);
    }

    return {
      data: response.records,
      page: response.page,
      pageSize: response.pageSize,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  }

  @AsyncAction()
  public async createUser(data: UserFormData): Promise<UserData> {
    const response = await this.usersApi.createUser({
      username: data.username,
      password: data.password,
      email: data.email,
      roleId: data.roleId,
    });

    const user: UserData = {
      id: response.id,
      username: response.username,
      email: response.email,
      role: response.role,
      avatar: response.avatar,
      createdUtcDate: response.createdUtcDate,
      modifiedUtcDate: response.modifiedUtcDate,
    };

    this.dataAccess.add(user);

    return user;
  }

  @AsyncAction()
  public async updateUser(id: number, data: Partial<UpdateUserRequest>): Promise<void> {
    const user = this.dataAccess.entityManager.getEntityById(id);
    const request: UpdateUserRequest = {
      id,
      roleId: data.roleId,
      username: data.username,
      email: data.email,
      avatar: data.avatar,
    }
    await this.usersApi.updateUser(request);
    if (user) this.dataAccess.update({ ...user, ...data, id });
  }

  @AsyncAction()
  public async deleteUsers(ids: number[]): Promise<void> {
    await Promise.all(
      ids.map(id => this.usersApi.deleteUser(id))
    );
    this.dataAccess.removeMany(ids);
  }

  @AsyncAction()
  public async deleteSelectedUsers(selectedRows: TreeNode<UserData>[]): Promise<void> {
    if (selectedRows.length === 0) {
      throw new Error('Не выбраны пользователи для удаления');
    }

    const ids = selectedRows.map(row => row.data.id);
    await this.deleteUsers(ids);
  }

  @AsyncAction()
  public async updateUserAvatar(userId: number, file: File): Promise<void> {
    const response = await this.usersApi.updateUserAvatar({ id: userId }, file);
    
    const user = this.dataAccess.entityManager.getEntityById(userId);
    if (user) {
      this.dataAccess.update({
        ...user,
        avatar: response.avatar,
      });
    }
  }
}

export default UserActions;
