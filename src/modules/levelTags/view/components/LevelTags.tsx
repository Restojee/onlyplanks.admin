import React from 'react';
import { withView } from '@common/hocs/withView';
import ContentManager from '@ui/ContentManager';
import LevelTagsGridModel from './LevelTags.model';
import { ColumnSearch } from '@/modules/levels/view/components/ColumnSearch';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';
import { Select } from '@common/components/Combobox/Select';

export interface LevelTagsProps {
  viewModel: LevelTagsGridModel;
}

const LevelTags: React.FC<LevelTagsProps> = ({ viewModel }) => {
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
          onChange={viewModel.handleFilterLevelSelectChange}
          size="sm"
          leftIcon="IconLevels"
          placeholder="Уровень"
        />
      ),
    },
    {
      id: 'tag-filter',
      component: (
        <Select
          options={viewModel.tagOptions}
          value={viewModel.dataAccess.filterTagId}
          onChange={viewModel.handleFilterTagOptionChange}
          size="sm"
          leftIcon="IconTag"
          placeholder="Тег"
        />
      ),
    },
    {
      id: 'column-search',
      component: (
        <ColumnSearch
          searchText={viewModel.dataAccess.filterSearchText}
          selectedColumns={viewModel.dataAccess.filterSelectedColumns}
          columns={viewModel.columnSearchColumns}
          onSearchTextChange={viewModel.handleFilterSearchTextChange}
          onSelectedColumnsChange={viewModel.handleFilterSelectedColumnsChange}
          placeholder="Поиск по тегам/картам/пользователям..."
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

export default withView(LevelTags, LevelTagsGridModel);
