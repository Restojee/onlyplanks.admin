import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import UserCommentsModel from './UserComments.model';
import ContentManager from '@ui/ContentManager';

export interface UserCommentsProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const UserComments: React.FC<WithViewProps<UserCommentsModel, UserCommentsProps>> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      contentElements={viewModel.commentsCollection}
      columns={viewModel.tableColumns}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      onCellEdit={viewModel.handleCellEdit}
      toolbarItems={viewModel.getToolbarItems}
    />
  );
};

export default withView(UserComments, UserCommentsModel);
