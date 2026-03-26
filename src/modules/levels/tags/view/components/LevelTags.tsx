import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import LevelTagsModel from './LevelTags.model';
import ContentManager from '@ui/ContentManager';

export interface LevelTagsProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const LevelTags: React.FC<WithViewProps<LevelTagsModel, LevelTagsProps>> = ({ viewModel }) => {
  React.useEffect(() => {
    if (viewModel.props.onSetContentManagerRef) {
      viewModel.props.onSetContentManagerRef({
        handleCreate: () => viewModel.handleAttach(viewModel.selectedRows),
        handleDelete: () => viewModel.handleDetach(viewModel.selectedRows),
        selectedRows: viewModel.selectedRows,
      });
    }
  }, [viewModel.selectedRows, viewModel.props.onSetContentManagerRef]);

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

export default withView(LevelTags, LevelTagsModel);
