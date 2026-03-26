import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import LevelCompletedModel from './LevelCompleted.model';
import ContentManager from '@ui/ContentManager';

export interface LevelCompletedProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const LevelCompleted: React.FC<WithViewProps<LevelCompletedModel, LevelCompletedProps>> = ({ viewModel }) => {
  React.useEffect(() => {
    if (viewModel.props.onSetContentManagerRef) {
      viewModel.props.onSetContentManagerRef({
        handleCreate: viewModel.handleCreateCompleted,
        handleDelete: () => viewModel.handleDelete(viewModel.selectedRows),
        selectedRows: viewModel.selectedRows,
      });
    }
  }, [viewModel.selectedRows, viewModel.props.onSetContentManagerRef]);

  return (
    <ContentManager
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.completedCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      onCellEdit={viewModel.handleCellEdit}
    />
  );
};

export default withView(LevelCompleted, LevelCompletedModel);
