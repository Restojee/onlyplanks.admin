import { inject } from 'inversify';
import { AsyncAction, Computed, OnMounted, State, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import type { ColumnDef } from '@tanstack/react-table';
import type { TreeNode } from '@ui/DataTreeTable';
import type { ContentManagerRef } from '@ui/ContentManager/ContentManager.model';
import { getUserAuditLogColumns, getUserAuditLogsToolbarItems } from '@/modules/userAuditLogs/view/utils';
import type { UserAuditLogData } from '@/modules/userAuditLogs/model/entities/types';
import { UserAuditLogsActions, UserAuditLogsDataAccess, UserAuditLogsActionsInjectKey, UserAuditLogsDataAccessInjectKey } from '@/modules/userAuditLogs/model/services';

import type { UserAuditLogsProps } from './UserAuditLogs';

class UserAuditLogsModel extends ViewModel<UserAuditLogsProps> {
  private contentManagerRef: ContentManagerRef  = null;

  @State()
  public setContentManagerRef = (ref: ContentManagerRef): void => {
    this.contentManagerRef = ref;
  };

  constructor(
    @inject(UserAuditLogsDataAccessInjectKey) public dataAccess: UserAuditLogsDataAccess,
    @inject(UserAuditLogsActionsInjectKey) public actions: UserAuditLogsActions,
  ) {
    super();
  }

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {}

  public onPageLoad = async (page: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc') => {
    const result = await this.actions.loadPage(page, pageSize, {
      query: this.dataAccess.filterSearchText,
      actorUserId: this.dataAccess.filterActorUserId,
      targetUserId: this.dataAccess.filterTargetUserId,
      action: this.dataAccess.filterAction,
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
    return 'Лог действий';
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<UserAuditLogData>>[] {
    return getUserAuditLogColumns();
  }

  public entityToTreeNode = (row: UserAuditLogData) => ({
    id: row.id,
    data: row,
  });

  @Computed()
  public get collection(): UserAuditLogData[] {
    return this.dataAccess.entityManager.getCollection;
  }

  @Action()
  public handleSearch = (query: string): void => {
    this.dataAccess.filterSearchText = query;
    this.contentManagerRef?.reloadData();
  };

  @Computed()
  public get getToolbarItems() {
    return getUserAuditLogsToolbarItems({
      searchQuery: this.dataAccess.filterSearchText,
      onSearch: this.handleSearch.bind(this),
    });
  }
}

export default UserAuditLogsModel;
