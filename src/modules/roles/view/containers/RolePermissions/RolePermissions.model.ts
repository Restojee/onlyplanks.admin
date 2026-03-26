import { inject } from 'inversify';
import { Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import { RoleDataAccessInjectKey } from '@/modules/roles/model/common/constants';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type { RolePermissionsProps } from './RolePermissions';

const GROUP_TITLES: Record<string, string> = {
  Moder: 'Права с полным доступом (для глобальных прав)',
  Owner: 'Права с личным доступом (к своему контенту)',
  System: 'Прочие права',
};

const GROUP_ORDER = ['Moder', 'Owner', 'System'] as const;

export interface PolicyGroup {
  label: string;
  title: string;
  policies: PolicyInfo[];
  permissionLabels: string[];
  isMatrix: boolean;
}

class RolePermissionsModel extends ViewModel<RolePermissionsProps> {
  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess
  ) {
    super();
  }

  @Computed()
  public get policies(): PolicyInfo[] {
    return this.dataAccess.editedPolicies;
  }

  @Computed()
  public get policyGroups(): PolicyGroup[] {
    const groupedByGroup = new Map<string, PolicyInfo[]>();

    this.policies.forEach(p => {
      const group = p.group || 'System';
      if (!groupedByGroup.has(group)) {
        groupedByGroup.set(group, []);
      }
      groupedByGroup.get(group).push(p);
    });

    const groups: PolicyGroup[] = [];

    groupedByGroup.forEach((policies, group) => {
      const permissionLabels = this.getGroupPermissionLabels(group, policies);
      const isMatrix = permissionLabels.length > 1;

      groups.push({
        label: group,
        title: GROUP_TITLES[group] || group,
        policies,
        permissionLabels,
        isMatrix,
      });
    });

    const order = new Map<string, number>(
      GROUP_ORDER.map((g, i) => [g, i])
    );

    return groups.sort((a, b) => (order.get(a.label) ?? 999) - (order.get(b.label) ?? 999));
  }

  private getGroupPermissionLabels(groupLabel: string, policies: PolicyInfo[]): string[] {
    const labels = new Set<string>();
    policies.forEach(p => {
      p.permissions.forEach(perm => labels.add(perm.label));
    });
    return Array.from(labels);
  }

  @Computed()
  public get disabled(): boolean {
    return this.props.disabled || false;
  }

  public getLabelDisplay(label: string): string {
    return label;
  }

  public getPermissionByLabel(policy: PolicyInfo, label: string) {
    return policy.permissions.find(p => p.label === label);
  }

  public areAllGranted(policy: PolicyInfo): boolean {
    return policy.permissions.every(p => p.granted);
  }

  @Action()
  public handlePermissionChange = (policyKey: string, permKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return {
        ...p,
        permissions: p.permissions.map(perm =>
          perm.key === permKey ? { ...perm, granted: checked } : perm
        ),
      };
    });
    this.props.onChange?.(updated);
  };

  @Action()
  public handleAllToggle = (policyKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return {
        ...p,
        permissions: p.permissions.map(perm => ({ ...perm, granted: checked })),
      };
    });

    this.props.onChange?.(updated);
  };
}

export default RolePermissionsModel;
