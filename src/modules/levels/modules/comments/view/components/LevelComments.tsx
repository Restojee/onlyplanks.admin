import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import LevelCommentsModel from './LevelComments.model';
import ContentManager from '@ui/ContentManager';

export interface LevelCommentsProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const LevelComments: React.FC<WithViewProps<LevelCommentsModel, LevelCommentsProps>> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      contentElements={viewModel.commentsCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      onCellEdit={viewModel.handleCellEdit}
    />
  );
};

export default withView(LevelComments, LevelCommentsModel);
