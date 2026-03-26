import { injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { TreeNode } from '@ui/DataTreeTable';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { RoleData, RoleFormData, PolicyInfo } from '@/modules/roles/model/entities/types';
import * as yup from 'yup';
import { validateYupField, validateYupForm, type FieldErrors } from '@common/utils/yupValidationAdapter';

interface RoleAssignFormData {
  userId?: number;
}

const roleFormSchema = yup.object({
  name: yup.string().trim().required('Введите название роли'),
  description: yup.string().trim().default(''),
});

const assignFormSchema = yup.object({
  userId: yup.number().required('Выберите пользователя'),
});

@injectable()
export class RoleDataAccess {
  @State()
  public roleFormData: RoleFormData;

  @State()
  public roleFormErrors: FieldErrors<RoleFormData> = {};

  @State()
  public assignFormData: RoleAssignFormData;

  @State()
  public assignFormErrors: FieldErrors<RoleAssignFormData> = {};

  @State()
  public selectedRole: RoleData  = null;

  @State()
  private readonly _policyEntityManager: EntityManager<PolicyInfo>;

  @State()
  private readonly _entityManager: EntityManager<RoleData>;

  constructor() {
    this._entityManager = new EntityManager<RoleData>({
      getRowId: row => row.id
    });

    this._policyEntityManager = new EntityManager<PolicyInfo>({
      getRowId: row => row.key,
    });
    this.roleFormData = { 
      name: '', 
      description: '',
    };

    this.assignFormData = {
      userId: undefined,
    };
  }

  private applyErrors<T extends Record<string, any>>(target: T, next: Partial<T>): void {
    for (const key of Object.keys(target)) {
      if (!(key in next)) {
        delete (target as any)[key];
      }
    }

    for (const [key, value] of Object.entries(next)) {
      (target as any)[key] = value;
    }
  }

  @Action()
  public setRoleName(name: string): void {
    this.roleFormData.name = name;
    if (this.roleFormErrors.name) {
      delete this.roleFormErrors.name;
    }
  }

  @Action()
  public setRoleDescription(description: string): void {
    this.roleFormData.description = description;
    if (this.roleFormErrors.description) {
      delete this.roleFormErrors.description;
    }
  }

  @Action()
  public resetRoleForm(): void {
    this.roleFormData.name = '';
    this.roleFormData.description = '';
    this.applyErrors(this.roleFormErrors, {});
  }

  @Action()
  public async validateRoleForm(): Promise<boolean> {
    const { isValid, errors } = await validateYupForm(roleFormSchema, this.roleFormData);
    this.applyErrors(this.roleFormErrors, errors);
    return isValid;
  }

  @Action()
  public async validateRoleName(): Promise<boolean> {
    const { isValid, error } = await validateYupField(roleFormSchema, this.roleFormData, 'name');
    if (error) {
      this.roleFormErrors.name = error;
    } else {
      delete this.roleFormErrors.name;
    }
    return isValid;
  }

  @Action()
  public async validateRoleDescription(): Promise<boolean> {
    const { isValid, error } = await validateYupField(roleFormSchema, this.roleFormData, 'description');
    if (error) {
      this.roleFormErrors.description = error;
    } else {
      delete this.roleFormErrors.description;
    }
    return isValid;
  }

  @Action()
  public setAssignUserId(userId?: number): void {
    this.assignFormData.userId = userId;
    if (this.assignFormErrors.userId) {
      delete this.assignFormErrors.userId;
    }
  }

  @Action()
  public resetAssignForm(): void {
    this.assignFormData.userId = undefined;
    this.applyErrors(this.assignFormErrors, {});
  }

  @Action()
  public async validateAssignForm(): Promise<boolean> {
    const { isValid, errors } = await validateYupForm(assignFormSchema, this.assignFormData);
    this.applyErrors(this.assignFormErrors, errors);
    return isValid;
  }

  @Action()
  public async validateAssignUserId(): Promise<boolean> {
    const { isValid, error } = await validateYupField(assignFormSchema, this.assignFormData, 'userId');
    if (error) {
      this.assignFormErrors.userId = error;
    } else {
      delete this.assignFormErrors.userId;
    }
    return isValid;
  }

  @Computed()
  public get entityManager(): EntityManager<RoleData> {
    return this._entityManager;
  }

  @Computed()
  public get editedPolicies(): PolicyInfo[] {
    return this._policyEntityManager.getCollection;
  }

  @Action()
  public add(role: RoleData): void {
    this._entityManager.create(role);
  }

  @Action()
  public update(role: RoleData): void {
    this._entityManager.set(role);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public removeMany(ids: number[]): void {
    ids.forEach(id => this._entityManager.remove(id));
  }

  @Action()
  public filter(predicate: (role: RoleData) => boolean): TreeNode<RoleData>[] {
    const filtered = this._entityManager.getCollection.filter(predicate);

    return filtered.map(role => ({
      id: role.id,
      data: role,
    }));
  }

  @Action()
  public selectRole(role: RoleData): void {
    this.selectedRole = role;
    const cloned = JSON.parse(JSON.stringify(role.policies || []));
    this._policyEntityManager.setAll(cloned);
  }

  @Action()
  public deselectRole(): void {
    this.selectedRole = null;
    this._policyEntityManager.setAll([]);
  }

  @Action()
  public updateEditedPolicies(policies: PolicyInfo[]): void {
    this._policyEntityManager.setAll(policies);
  }

  @Action()
  public resetEditedPolicies(): void {
    if (this.selectedRole) {
      const cloned = JSON.parse(JSON.stringify(this.selectedRole.policies || []));
      this._policyEntityManager.setAll(cloned);
    } else {
      this._policyEntityManager.setAll([]);
    }
  }

  @Computed()
  public get hasPolicyChanges(): boolean {
    if (!this.selectedRole || this.editedPolicies.length === 0) {
      return false;
    }
    return JSON.stringify(this.editedPolicies) !== JSON.stringify(this.selectedRole.policies || []);
  }
}

export default RoleDataAccess;
