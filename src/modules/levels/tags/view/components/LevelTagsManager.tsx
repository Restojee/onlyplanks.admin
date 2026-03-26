import React from 'react';
import ContentManager from '@ui/ContentManager';
import LevelTagsModel from './LevelTags.model';

interface LevelTagsManagerProps {
  viewModel: LevelTagsModel;
}

export const LevelTagsManager: React.FC<LevelTagsManagerProps> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.tagCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
    />
  );
};
