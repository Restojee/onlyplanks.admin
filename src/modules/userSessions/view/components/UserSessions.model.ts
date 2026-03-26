import { inject } from 'inversify';
import { AsyncAction, Computed, OnMounted, State, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { ColumnDef } from '@tanstack/react-table';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { getUserSessionColumns, getUserSessionsToolbarItems } from '@/modules/userSessions/view/utils';
import type { UserSessionData } from '@/modules/userSessions/model/entities/types';
import { UserSessionsActions, UserSessionsDataAccess, UserSessionsActionsInjectKey, UserSessionsDataAccessInjectKey } from '@/modules/userSessions/model/services';
import type { UserSessionsProps } from './UserSessions';

class UserSessionsModel extends ViewModel<UserSessionsProps> {
  private contentManagerRef: ContentManagerRef  = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(UserSessionsDataAccessInjectKey) public dataAccess: UserSessionsDataAccess,
    @inject(UserSessionsActionsInjectKey) public actions: UserSessionsActions,
  ) {
    super();
  }

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {}

  public onPageLoad = async (page: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
    const result = await this.actions.loadPage(page, pageSize, {
      query: this.dataAccess.filterSearchText,
      userId: this.dataAccess.filterUserId,
      success: this.dataAccess.filterSuccess,
      sortField,
      sortDirection,
    });

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      pageSize: result.pageSize,
      page: result.page,
      data: result.rows,
    };
  };

  @Computed()
  public get pageTitle(): string {
    return 'Сессии пользователей';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<UserSessionData>>[] {
    return getUserSessionColumns();
  }

  public entityToTreeNode = (row: UserSessionData) => ({
    id: row.id,
    data: row,
  });

  @Computed()
  public get collection(): UserSessionData[] {
    return this.dataAccess.entityManager.getCollection;
  }

  @Action()
  public handleSearch = (query: string): void => {
    this.dataAccess.filterSearchText = query;
    this.contentManagerRef?.reloadData();
  };

  @Computed()
  public get getToolbarItems() {
    return getUserSessionsToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleSearch.bind(this),
    });
  }
}

export default UserSessionsModel;
