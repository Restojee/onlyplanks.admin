import React from 'react';
import { withView } from '@common/hocs/withView';
import ContentManager from '@ui/ContentManager';
import CompletedGridModel from './Completed.model';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';

export interface CompletedProps {
  viewModel: CompletedGridModel;
}

const Completed: React.FC<CompletedProps> = ({ viewModel }) => {
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
      contentElements={viewModel.collection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      onPageLoad={viewModel.onPageLoad}
      onCellEdit={viewModel.handleCellEdit}
      filters={filters}
      entityToTreeNode={viewModel.entityToTreeNode}
      selectedRows={viewModel.selectedRows}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onRowCheck={viewModel.handleRowCheck}
      enableSorting
    />
  );
};

export default withView(Completed, CompletedGridModel);
