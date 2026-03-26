import { inject } from 'inversify';
import { State, AsyncAction, Computed, OnMounted, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { type ListItemOptions } from '@ui/Select/common/types';
import RolesApi from '@common/api/roles/api';
import { RolesApiInjectKey } from '@/modules/roles/model/common/constants';
import type { RoleCardResponse } from '@common/api/roles/types';
import type { RoleSelectViewProps } from './RoleSelectView';

class RoleSelectViewModel extends ViewModel<RoleSelectViewProps> {
  @State()
  private roles: RoleCardResponse[] = [];

  @State()
  public searchQuery: string = '';

  @State()
  public loading: boolean = false;

  constructor(@inject(RolesApiInjectKey) private rolesApi: RolesApi) {
    super();
  }

  @OnMounted()
  public onMounted(): void {
    this.loadRoles();
  }

  @AsyncAction()
  public async loadRoles(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.rolesApi.collect({ page: 1, size: 500 });
      this.roles = response;
    } finally {
      this.loading = false;
    }
  }

  @Action()
  public handleSearchChange(query: string): void {
    this.searchQuery = query;
  }

  @Computed()
  public get options(): ListItemOptions[] {
    const q = String(this.searchQuery).trim().toLowerCase();
    const filtered = q
      ? this.roles.filter(r => r.name.toLowerCase().includes(q))
      : this.roles;

    return filtered.map(r => ({
      label: r.name,
      value: r.id,
    }));
  }

  @Computed()
  public get placeholder(): string {
    return this.loading ? 'Загрузка...' : (this.props.placeholder || 'Выберите роль...');
  }

  @Computed()
  public get isDisabled(): boolean {
    return this.props.disabled || this.loading;
  }

  public handleChange = (option: ListItemOptions): void => {
    this.props.onChange?.(option.value as number);
  };
}

export default RoleSelectViewModel;
