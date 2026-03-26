import React from 'react';
import ContentManager from '@ui/ContentManager';
import UsersModel from './Users.model';

export interface UsersViewProps {
  viewModel: UsersModel;
}

const Users: React.FC<UsersViewProps> = ({ viewModel }) => {
  return (
    <ContentManager
      setContentManagerRef={viewModel.setContentManagerRef}
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.userCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      onCellEdit={viewModel.handleCellEdit}
      onDelete={viewModel.handleDelete}
      onPageLoad={viewModel.loadUsers}
      selectedRows={viewModel.selectedRows}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onRowCheck={viewModel.handleRowCheck}
      enableSorting
    />
  );
}

export default Users;
