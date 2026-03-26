import React from 'react';
import ContentManager from '@ui/ContentManager/ContentManager';
import { withView } from '@common/hocs/withView';
import InvitesModel from './Invites.model';

export interface InvitesProps {
  viewModel: InvitesModel;
}

const Invites: React.FC<InvitesProps> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey="id"
      title={viewModel.pageTitle}
      contentElements={viewModel.inviteCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onRowCheck={viewModel.handleRowCheck}
      enableSorting
    />
  );
}

export default withView(Invites, InvitesModel);
