import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import UserFavoritesModel from './UserFavorites.model';
import ContentManager from '@ui/ContentManager';

export interface UserFavoritesProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

const UserFavorites: React.FC<WithViewProps<UserFavoritesModel, UserFavoritesProps>> = ({ viewModel }) => {
  return (
    <ContentManager
      dataKey='id'
      contentElements={viewModel.favoritesCollection}
      columns={viewModel.tableColumns}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowSelect}
      toolbarItems={viewModel.getToolbarItems}
    />
  );
};

export default withView(UserFavorites, UserFavoritesModel);
