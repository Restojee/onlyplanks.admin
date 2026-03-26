import React from 'react';
import { withView } from '@common/hocs/withView';
import type { WithViewProps } from '@common/hocs/withView/types';
import FavoritesModel from './Favorites.model';
import ContentManager from '@ui/ContentManager';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';

export interface FavoritesProps {}

const Favorites: React.FC<WithViewProps<FavoritesModel, FavoritesProps>> = ({ viewModel }) => {
  const filters = [
    {
      id: 'user-filter',
      component: (
        <UserSelect
          value={viewModel.dataAccess.filterUserId}
          onChange={viewModel.handleFilterUserChange}
          size="sm"
          leftIcon="IconUser"
        />
      ),
    },
    {
      id: 'level-filter',
      component: (
        <LevelSelect
          value={viewModel.dataAccess.filterLevelId}
          onChange={viewModel.handleFilterLevelChange}
          size="sm"
          leftIcon="IconLevels"
          placeholder="Уровень"
        />
      ),
    },
  ];

  return (
    <ContentManager
      dataKey="id"
      setContentManagerRef={viewModel.setContentManagerRef}
      title={viewModel.pageTitle}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      contentElements={viewModel.collection}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      onRowCheck={viewModel.handleRowCheck}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onPageLoad={viewModel.onPageLoad}
      onCellEdit={viewModel.handleCellEdit}
      filters={filters}
      enableSorting
    />
  );
};

export default withView(Favorites, FavoritesModel);
