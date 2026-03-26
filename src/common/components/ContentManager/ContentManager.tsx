import React from 'react';
import { Column } from '@ui/Layout';
import DataTreeTable from '@ui/DataTreeTable';
import { Toolbar } from '@ui/Toolbar';
import { withView } from '@common/hocs/withView';
import ContentManagerViewModel, { ContentManagerProps, ContentManagerRef } from './ContentManager.model';
import withModule from '@common/hocs/withModule';
import { AsyncPaginationServiceInjectKey, PaginationServiceInjectKey, SortingServiceInjectKey } from '@/constants';
import { AsyncPaginationService, PaginationService } from '@common/services/pagination';
import { SortingService } from '@common/services/sorting';
import { DataFilters } from '@ui/DataFilters';
import type { RowType } from '@common/store/entity/EntityManager';

interface Props<TData extends { id: RowType } = { id: RowType }> {
  viewModel: ContentManagerViewModel<TData>;
}

const ContentManager = <TData extends { id: RowType } = { id: RowType }>({ viewModel }: Props<TData>) => {
  return (
    <Column className="content-manager">

      { viewModel.getComputedToolbarItems && (
        <Toolbar items={viewModel.getComputedToolbarItems} />
      ) }

      { viewModel.props.filters && (
        <DataFilters
          filters={viewModel.props.filters}
          isVisible={viewModel.filtersVisible}
        />
      ) }

      <DataTreeTable
        dataKey={viewModel.dataKey}
        columns={viewModel.columns}
        data={viewModel.getDisplayData}
        selectedRowId={viewModel.props.selectedRowId}
        onRowSelect={viewModel.handleRowSelect}
        onRowCheck={viewModel.handleRowCheck}
        onRowExpand={viewModel.handleRowExpand}
        onSort={viewModel.handleSort}
        onCellEdit={viewModel.onCellEdit}
        pagination={viewModel.getPaginationConfig}
        onPagination={viewModel.getPaginationCallbacks}
        sortColumn={viewModel.getSortField}
        sortDirection={viewModel.getSortDirection}
        enableSorting={viewModel.props.enableSorting ?? true}
        showColumnBorders
        enableColumnResizing
        useSingleSelect
        size="sm"
      />
    </Column>
  );
};

const Component = withView<ContentManagerViewModel, ContentManagerProps>(ContentManager, ContentManagerViewModel);

export default withModule({
  component: Component,
  key: 'ContentManager',
  providers: [
    {
      key: PaginationServiceInjectKey,
      provide: PaginationService,
    },
    {
      key: AsyncPaginationServiceInjectKey,
      provide: AsyncPaginationService,
    },
    {
      key: SortingServiceInjectKey,
      provide: SortingService,
    },
  ]
});

