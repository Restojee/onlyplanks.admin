import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnResizeMode,
  ExpandedState as TanStackExpandedState,
  ColumnSizingState
} from '@tanstack/react-table';
import clsx from 'clsx';
import { VirtualScroll } from '@common/components/VirtualScroll';
import { DataTreeTableProps, SelectionState } from './types';
import { TableFooter } from './TableFooter';
import { 
  useTableData,
  useContainerWidth,
  useTableEffects,
  useInitialColumnSizing,
  useTableColumns,
  useRowExpansion,
  useRowSelection,
  useVisibleData,
  useColumnResizing,
  useTableSorting,
  useTableHead,
  useTableBody
} from './hooks';
import styles from './DataTreeTable.module.scss';
import NoContent from '@ui/DataTreeTable/NoContent';

const DataTreeTable = <T extends {},>({
  data,
  columns,
  sortColumn,
  sortDirection,
  onSort,
  onRowSelect,
  onRowCheck,
  onRowExpand,
  onCellEdit,
  selectedRowId,
  enableRowSelection = true,
  enableRowClickSelection = true,
  enableSorting = true,
  enableColumnResizing = true,
  defaultExpanded = false,
  className,
  size = 'md',
  showColumnBorders = false,
  minHeight = 500,
  pagination,
  onPagination,
  dataKey
}: DataTreeTableProps<T>) => {
  const [expanded, setExpanded] = React.useState<TanStackExpandedState>({} as TanStackExpandedState);
  const [rowSelection, setRowSelection] = React.useState<SelectionState>({});
  const [internalSelectedRowId, setInternalSelectedRowId] = React.useState<string | number >(selectedRowId);
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange');
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  const { containerRef } = useContainerWidth(setContainerWidth);
  const { flattenedData } = useTableData(data);
  const { handleSortingChange, sorting } = useTableSorting({ sortColumn, sortDirection, onSort });

  React.useEffect(() => {
    if (selectedRowId !== undefined) {
      setInternalSelectedRowId(selectedRowId);
    }
  }, [selectedRowId]);

  useTableEffects({
    defaultExpanded,
    flattenedData,
    setExpanded,
    sorting,
    onSort: handleSortingChange,
    expanded,
    onRowExpand,
    rowSelection,
    onRowCheck,
  });

  const { toggleRowExpanded } = useRowExpansion({ flattenedData, setExpanded });
  const { handleRowSelection } = useRowSelection({ flattenedData, setRowSelection });

  const handleRowClick = React.useCallback((rowId: string | number) => {
    const clickedRow = flattenedData.find(row => row.id === rowId);
    if (clickedRow) {
      setInternalSelectedRowId(rowId);
      onRowSelect?.(clickedRow);
    }
  }, [flattenedData, onRowSelect]);

  const tableColumns = useTableColumns({
    columns,
    enableRowSelection,
    expanded,
    rowSelection,
    flattenedData,
    toggleRowExpanded,
    handleRowSelection,
  });

  const initialColumnSizing = useInitialColumnSizing({
    tableColumns,
    containerWidth,
    enableRowSelection,
  });

  React.useEffect(() => {
    if (!Object.keys(columnSizing).length && Object.keys(initialColumnSizing).length > 0) {
      setColumnSizing(initialColumnSizing);
    }
  }, [initialColumnSizing, columnSizing]);

  const visibleData = useVisibleData({ flattenedData, expanded });

  const { handleColumnSizingChange } = useColumnResizing({
    tableColumns,
    containerWidth,
    setColumnSizing,
  });

  const table = useReactTable({
    data: visibleData,
    columns: tableColumns,
    state: {
      sorting,
      expanded,
      rowSelection,
      columnSizing,
    },
    enableSorting,
    enableSortingRemoval: false,
    enableColumnResizing,
    columnResizeMode,
    columnResizeDirection: 'ltr',
    defaultColumn: {
      minSize: 80,
    },
    onSortingChange: handleSortingChange,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: handleColumnSizingChange,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: (row) => row[dataKey],
    enableRowSelection: true,
    meta: {
      onCellEdit,
    },
  });

  const { renderTableHead } = useTableHead({ table, enableColumnResizing });
  const { renderTableBody } = useTableBody({
    table,
    flattenedData,
    expanded,
    rowSelection,
    selectedRowId: internalSelectedRowId,
    enableRowClickSelection,
    toggleRowExpanded,
    handleRowSelection,
    handleRowClick,
    onCellEdit,
    size,
  });

  const tableContainerClasses = clsx(
    styles.tableWrapper,
    {
      [styles.withColumnBorders]: showColumnBorders,
      [styles.sizeSm]: size === 'sm',
      [styles.sizeMd]: size === 'md'
    },
    className
  );

  return (
    <div className={tableContainerClasses} style={{ minHeight: `${minHeight}px` }}>
      <div className={styles.tableHeader}>
        <table className={styles.table}>
          {renderTableHead()}
        </table>
      </div>
      
      <div className={styles.tableBodyContainer}>
        <VirtualScroll useCustomScrollbar enableHorizontal>
          <div ref={containerRef}>
            <table className={styles.table}>
            <colgroup>
              {table.getHeaderGroups()[0]?.headers.map((header) => (
                <col key={header.id} style={{ width: header.getSize() }} />
              ))}
            </colgroup>
            {renderTableBody()}
          </table>
          {!visibleData.length && <NoContent />}
          </div>
        </VirtualScroll>
      </div>

      {pagination && onPagination && (
        <TableFooter pagination={pagination} callbacks={onPagination} />
      )}
    </div>
  );
};

export default DataTreeTable;
