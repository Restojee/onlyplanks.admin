import { inject } from 'inversify';
import { State, AsyncAction, Computed, OnMounted, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { type ListItemOptions } from '@ui/Select/common/types';
import { UserActions, UserActionsInjectKey, UserDataAccess, UserDataAccessInjectKey } from '@/modules/users/model/services';
import { InfiniteScrollService } from '@common/services/InfiniteScrollService';
import type { UserSelectViewProps } from './UserSelectView';

class UserSelectViewModel extends ViewModel<UserSelectViewProps> {
  @State()
  public infiniteScroll: InfiniteScrollService;

  @State()
  public searchQuery: string = '';

  constructor(
    @inject(UserActionsInjectKey) private userActions: UserActions,
    @inject(UserDataAccessInjectKey) private userDataAccess: UserDataAccess
  ) {
    super();
    this.infiniteScroll = new InfiniteScrollService(20);
  }

  @OnMounted()
  onMounted(): void {
    this.loadUsers();
  }

  @AsyncAction()
  async loadUsers(): Promise<void> {
    await this.infiniteScroll.loadFirstPage(async (params) => {
      return await this.userActions.loadUsers(params.page, params.pageSize);
    });
  }

  @AsyncAction()
  public async loadNextPage(): Promise<void> {
    await this.infiniteScroll.loadNextPage(async (params) => {
      return await this.userActions.loadUsers(params.page, params.pageSize);
    });
  }

  @Action()
  public handleSearchChange = (query: string): void => {
    this.searchQuery = query;
  }

  @Computed()
  get options(): ListItemOptions[] {
    const users = this.userDataAccess.entityManager.getCollection;
    let filteredUsers = users;

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    }

    return filteredUsers.map(user => ({
      label: user.username,
      value: user.id,
    }));
  }

  @Computed()
  get hasMore(): boolean {
    return this.infiniteScroll.hasMore;
  }

  @Computed()
  get isLoadingMore(): boolean {
    return this.infiniteScroll.loadingMore;
  }

  @Computed()
  get placeholder(): string {
    return this.infiniteScroll.loading ? 'Загрузка...' : (this.props.placeholder || 'Выберите пользователя...');
  }

  @Computed()
  get isDisabled(): boolean {
    return this.props.disabled || this.infiniteScroll.loading;
  }

  public handleChange = (option: ListItemOptions): void => {
    this.props.onChange?.(option.value as number);
  }
}

export default UserSelectViewModel;
