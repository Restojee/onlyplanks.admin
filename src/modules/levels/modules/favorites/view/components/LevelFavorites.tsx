import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import LevelFavoritesModel from './LevelFavorites.model';
import ContentManager from '@ui/ContentManager';

export interface LevelFavoritesProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const LevelFavorites: React.FC<WithViewProps<LevelFavoritesModel, LevelFavoritesProps>> = ({ viewModel }) => {

  return (
    <ContentManager
      dataKey='id'
      title={viewModel.pageTitle}
      contentElements={viewModel.favoritesCollection}
      columns={viewModel.tableColumns}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      toolbarItems={viewModel.getToolbarItems}
    />
  );
};

export default withView(LevelFavorites, LevelFavoritesModel);
