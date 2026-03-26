import { withView } from '@common/hocs/withView';
import LevelsModel from '@/modules/levels/view/containers/Levels.model';
import { WithViewProps } from '@common/hocs/withView/types';
import React from 'react';
import ContentManager from '@ui/ContentManager';
import { SelectLevelUser } from '@/modules/levels/view/components/SelectLevelUser';
import { ColumnSearch } from '@/modules/levels/view/components/ColumnSearch';

export interface LevelsProps extends WithViewProps<LevelsModel, {}> {}

const Levels: React.FC<LevelsProps> = ({ viewModel }) => {
  const filters = [
    {
      id: 'user-filter',
      component: (
        <SelectLevelUser
          selectedUserId={viewModel.filterUserId}
          selectedSearchTypes={viewModel.filterUserSearchTypes}
          onUserChange={viewModel.handleFilterUserChange}
          onSearchTypesChange={viewModel.handleFilterUserSearchTypesChange}
        />
      ),
    },
    {
      id: 'column-search',
      component: (
        <ColumnSearch
          searchText={viewModel.filterSearchText}
          selectedColumns={viewModel.filterSelectedColumns}
          columns={[
            { value: 'name', label: 'Название' },
            { value: 'description', label: 'Описание' },
          ]}
          onSearchTextChange={viewModel.handleFilterSearchTextChange}
          onSelectedColumnsChange={viewModel.handleFilterSelectedColumnsChange}
        />
      ),
    },
  ];

  return (
    <ContentManager
      dataKey='id'
      setContentManagerRef={viewModel.setContentManagerRef}
      title={viewModel.pageTitle}
      contentElements={viewModel.levelCollection}
      columns={viewModel.tableColumns}
      toolbarItems={viewModel.getToolbarItems}
      filters={filters}
      entityToTreeNode={viewModel.entityToTreeNode}
      onCellEdit={viewModel.handleCellEdit}
      onDelete={viewModel.handleDelete}
      onPageLoad={viewModel.loadLevels}
      selectedRows={viewModel.selectedRows}
      selectedRowId={viewModel.selectedRowId}
      onRowSelect={viewModel.handleRowSelect}
      onRowCheck={viewModel.handleRowCheck}
    />
  );
}

export default withView(Levels, LevelsModel);
