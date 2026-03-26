import { inject, injectable } from 'inversify';
import RolesApi from '@common/api/roles/api';
import { RoleDataAccess } from './RoleDataAccess';
import { RoleDataAccessInjectKey, RolesApiInjectKey } from '@/modules/roles/model/common/constants';
import type { PolicyInfo, RoleData, RoleFormData } from '@/modules/roles/model/entities/types';

@injectable()
export class RolesService {
  constructor(
    @inject(RolesApiInjectKey) private rolesApi: RolesApi,
    @inject(RoleDataAccessInjectKey) public dataAccess: RoleDataAccess
  ) {}

  public async loadRoles(page?: number, size?: number): Promise<{
    data: RoleData[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }> {
    const response = await this.rolesApi.collect({ page, size });

    const roles: RoleData[] = response.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      createdUtcDate: r.createdUtcDate,
      usersCount: r.usersCount,
      permissionsCount: r.permissionsCount,
    }));

    this.dataAccess.entityManager.setAll(roles);

    return {
      data: roles,
      page: page || 1,
      pageSize: size || roles.length,
      totalItems: roles.length,
      totalPages: 1,
    };
  }

  public async createRole(data: RoleFormData): Promise<RoleData> {
    const response = await this.rolesApi.create({
      name: data.name,
      description: data.description,
    });

    const role: RoleData = {
      id: response.id,
      name: response.name,
      description: response.description,
      createdUtcDate: response.createdUtcDate,
      usersCount: response.usersCount,
      permissionsCount: response.permissionsCount,
    };

    this.dataAccess.add(role);

    return role;
  }

  public async updateRole(id: number, data: Partial<RoleData>): Promise<void> {
    const role = this.dataAccess.entityManager.getEntityById(id);

    await this.rolesApi.update({
      id,
      name: (data.name ?? role?.name) as string,
      description: data.description ?? role?.description,
    });

    if (role) {
      this.dataAccess.update({
        ...role,
        ...data,
        id,
      });
    }
  }

  public async deleteRoles(ids: number[]): Promise<void> {
    await Promise.all(ids.map(id => this.rolesApi.delete({ roleId: id })));
    this.dataAccess.removeMany(ids);
  }

  public async loadRoleDetails(roleId: number): Promise<RoleData> {
    const details = await this.rolesApi.get({ roleId });

    const role: RoleData = {
      id: details.id,
      name: details.name,
      description: details.description,
      usersCount: details.usersCount,
      createdUtcDate: details.createdUtcDate,
      policies: details.policies,
      permissionsCount: details.policies?.length ?? 0,
    };

    const existing = this.dataAccess.entityManager.getEntityById(roleId);
    if (existing) {
      this.dataAccess.update({ ...existing, ...role });
    } else {
      this.dataAccess.add(role);
    }

    this.dataAccess.selectRole(role);

    return role;
  }

  public async updateRolePolicies(roleId: number, policies: PolicyInfo[]): Promise<void> {
    const role = this.dataAccess.entityManager.getEntityById(roleId);
    if (!role) throw new Error('Role not found');

    await this.rolesApi.setPermissions({
      roleId,
      policies,
    });

    const updatedRole: RoleData = {
      ...role,
      policies,
      permissionsCount: policies.length,
    };

    this.dataAccess.update(updatedRole);
    this.dataAccess.selectRole(updatedRole);
  }

  public async assignRoleToUser(userId: number, roleId: number): Promise<void> {
    const role = this.dataAccess.entityManager.getEntityById(roleId);
    if (!role) throw new Error('Role not found');

    await this.rolesApi.assignToUser({ userId, roleId: role.id });
    await this.loadRoles(1, 100);
  }
}

export default RolesService;
