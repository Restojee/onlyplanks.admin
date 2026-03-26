import React, { useState } from 'react';
import TagsModel from './Tags.model';
import { withView } from '@common/hocs/withView';
import ContentManager from '@ui/ContentManager/ContentManager';

export interface TagsProps {
  viewModel: TagsModel;
}

const Tags: React.FC<TagsProps> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.tagCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      onCellEdit={viewModel.handleCellEdit}
      selectedRows={viewModel.selectedRows}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onRowCheck={viewModel.handleRowCheck}
      enableSorting
    />
  );
}

export default withView(Tags, TagsModel);
