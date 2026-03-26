import React from 'react';
import { withView } from '@common/hocs/withView';
import ContentManager from '@ui/ContentManager';
import UserSessionsModel from './UserSessions.model';

export interface UserSessionsProps {
  viewModel: UserSessionsModel;
}

const UserSessions: React.FC<UserSessionsProps> = ({ viewModel }) => {
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

export default withView(UserSessions, UserSessionsModel);
