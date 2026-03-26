import { Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { RoleOtherPermissionsProps } from './RoleOtherPermissions';

class RoleOtherPermissionsModel extends ViewModel<RoleOtherPermissionsProps> {
  @Computed()
  public get title(): string {
    return this.props.title || 'Прочие права доступа';
  }

  @Computed()
  public get disabled(): boolean {
    return !!this.props.disabled;
  }

  @Computed()
  public get options(): { key: string; label: string }[] {
    return (this.props.availableOptions || [])
      .slice()
      .sort((a, b) => (a.label || a.key).localeCompare(b.label || b.key));
  }

  @Computed()
  private get selected(): Set<string> {
    return new Set(this.props.keys || []);
  }

  public isChecked = (key: string): boolean => {
    return this.selected.has(key);
  };

  public toggle = (key: string): void => {
    const next = new Set(this.selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);

    this.props.onChange?.(Array.from(next.values()));
  };
}

export default RoleOtherPermissionsModel;
