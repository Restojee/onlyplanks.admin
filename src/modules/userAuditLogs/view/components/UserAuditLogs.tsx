import React from 'react';
import { withView } from '@common/hocs/withView';
import ContentManager from '@ui/ContentManager';
import UserAuditLogsModel from './UserAuditLogs.model';

export interface UserAuditLogsProps {
  viewModel: UserAuditLogsModel;
}

const UserAuditLogs: React.FC<UserAuditLogsProps> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey="id"
      setContentManagerRef={viewModel.setContentManagerRef}
      title={viewModel.pageTitle}
      contentElements={viewModel.collection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      onPageLoad={viewModel.onPageLoad}
      entityToTreeNode={viewModel.entityToTreeNode}
    />
  );
};

export default withView(UserAuditLogs, UserAuditLogsModel);
