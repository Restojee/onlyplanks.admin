import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import UserCompletedModel from './UserCompleted.model';
import ContentManager from '@ui/ContentManager';

export interface UserCompletedProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const UserCompleted: React.FC<WithViewProps<UserCompletedModel, UserCompletedProps>> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      contentElements={viewModel.completedCollection}
      columns={viewModel.tableColumns}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      onCellEdit={viewModel.handleCellEdit}
      toolbarItems={viewModel.getToolbarItems}
    />
  );
};

export default withView(UserCompleted, UserCompletedModel);
