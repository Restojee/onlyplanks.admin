import React from 'react';
import { Table, flexRender, ExpandedState } from '@tanstack/react-table';
import clsx from 'clsx';
import { TreeNode, SelectionState } from '../types';
import { useEditableCell } from './useEditableCell';
import { useCellIntegrations } from './useCellIntegrations';
import styles from '../DataTreeTable.module.scss';
import { darkenColor } from '@common/utils/colorUtils';
import type { ThemeSizes } from '@common/themes/common/types';

interface UseTableBodyProps<T> {
  table: Table<TreeNode<T>>;
  flattenedData: TreeNode<T>[];
  expanded: ExpandedState;
  rowSelection: SelectionState;
  selectedRowId?: string | number ;
  enableRowClickSelection: boolean;
  toggleRowExpanded: (rowId: string | number) => void;
  handleRowSelection: (rowId: string | number, isMultiSelect: boolean) => void;
  handleRowClick: (rowId: string | number) => void;
  onCellEdit?: (rowId: string | number, columnId: string, value: unknown, rowData: T) => void;
  size: ThemeSizes;
}

export const useTableBody = <T,>({
  table,
  flattenedData,
  expanded,
  rowSelection,
  selectedRowId,
  enableRowClickSelection,
  toggleRowExpanded,
  handleRowSelection,
  handleRowClick,
  onCellEdit,
  size,
}: UseTableBodyProps<T>) => {
  const { isEditing, isAnyEditing, startEditing, stopEditing, handleSave } = useEditableCell<T>({
    onEdit: onCellEdit,
  });

  const { renderIntegratedCell } = useCellIntegrations<T>({
    isEditing,
    isAnyEditing,
    startEditing,
    stopEditing,
    handleSave,
    size,
  });

  const renderTableBody = React.useCallback(() => {
    return (
      <tbody className={styles.tbody}>
        {table.getRowModel().rows.map((row, rowIndex) => {
          const getHierarchyDepth = (): number => {
            let depth = 0;
            let currentRow = row.original;

            if (currentRow.children && currentRow.children.length > 0 && expanded[String(currentRow.id)]) {
              depth = 1;
            }

            while (currentRow.parentId && depth < 3) {
              const parent = flattenedData.find((r) => r.id === currentRow.parentId);
              if (!parent) break;
              if (parent.children && parent.children.length > 0 && expanded[String(parent.id)]) {
                depth++;
              }
              currentRow = parent;
            }
            
            return Math.min(depth, 3);
          };

          const hierarchyDepth = getHierarchyDepth();
          const isInExpandedHierarchy = hierarchyDepth > 0;
          
          const getBackgroundColor = (): string => {
            const isEvenRow = rowIndex % 2 === 0;
            const baseColor = isEvenRow ? '#ffffff' : '#f3f4f5';
            
            if (!isInExpandedHierarchy) {
              return undefined;
            }
            
            const darkenAmount = hierarchyDepth * 13;

            return darkenColor(baseColor, darkenAmount);
          };

          const isRowSelected = selectedRowId !== null && selectedRowId !== undefined && String(selectedRowId) === String(row.id);

          return (
            <tr
              key={row.id}
              className={clsx(styles.row, {
                [styles.checked]: row.getIsSelected(),
                [styles.selected]: isRowSelected,
                [styles.expanded]: isInExpandedHierarchy,
              })}
              style={{
                backgroundColor: getBackgroundColor(),
              }}
              onClick={() => enableRowClickSelection && handleRowClick(row.id)}
            >
              {row.getVisibleCells().map((cell) => {
                const integrated = renderIntegratedCell(cell, row);
                if (integrated) {
                  return integrated;
                }

                return (
                  <td key={cell.id} className={styles.td} style={{ width: cell.column.getSize() }}>
                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }, [table, flattenedData, expanded, rowSelection, selectedRowId, enableRowClickSelection, toggleRowExpanded, handleRowSelection, handleRowClick, renderIntegratedCell]);

  return { renderTableBody };
};
