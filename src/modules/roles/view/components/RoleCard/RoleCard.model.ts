import { Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type { RoleCardProps } from './RoleCard';

class RoleCardModel extends ViewModel<RoleCardProps> {
  @Computed()
  public get role() {
    return this.props.role;
  }

  @Computed()
  public get isSelected(): boolean {
    return this.props.isSelected || false;
  }

  @Action()
  public handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.props.onClick?.();
  };

  @Action()
  public handleEdit = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.props.onEdit?.();
  };

  @Action()
  public handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.props.onDelete?.();
  };

  @Action()
  public handleAssign = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.props.onAssign?.();
  };

  public getPermissionSummary = (policies?: PolicyInfo[]): string => {
    if (!policies || policies.length === 0) {
      if (typeof this.role.permissionsCount === 'number') {
        return `${this.role.permissionsCount} прав`;
      }
      return 'Нет прав';
    }
    
    const totalActions = policies.reduce((sum, p) => {
      return sum + p.permissions.filter(perm => perm.granted).length;
    }, 0);
    
    return `${totalActions} действий`;
  };
}

export default RoleCardModel;
