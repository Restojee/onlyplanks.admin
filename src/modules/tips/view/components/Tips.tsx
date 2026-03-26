import React from 'react';
import ContentManager from '@ui/ContentManager';
import TipsModel from './Tips.model';

export interface TipsProps {
  viewModel: TipsModel;
}

const Tips: React.FC<TipsProps> = ({ viewModel }) => {
  return (
    <ContentManager
      setContentManagerRef={viewModel.setContentManagerRef}
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.tipCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      onCellEdit={viewModel.handleCellEdit}
      onDelete={viewModel.handleDelete}
      onPageLoad={viewModel.loadTips}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
    />
  );
}

export default Tips;
