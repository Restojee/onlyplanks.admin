import React from 'react';
import { Checkbox } from '@common/components/Checkbox';
import { DefaultColumnId, TreeNode } from '../types';
import { ExpandedState as TanStackExpandedState } from '@tanstack/react-table';
import styles from '../DataTreeTable.module.scss';
import { Toggler } from '@ui/Toggler';

interface UseTableColumnsProps<T> {
  columns: any[];
  enableRowSelection: boolean;
  expanded: TanStackExpandedState;
  rowSelection: Record<string, boolean>;
  flattenedData: TreeNode<T>[];
  toggleRowExpanded: (rowId: string | number) => void;
  handleRowSelection: (rowId: string | number, checked: boolean) => void;
}

export const useTableColumns = <T,>({
  columns,
  enableRowSelection,
  expanded,
  rowSelection,
  toggleRowExpanded,
  handleRowSelection,
}: UseTableColumnsProps<T>) => {
  
  const renderExpandToggle = React.useCallback((row: any) => {
    if (!row.original.hasChildren) {
      return <div className={styles.expandButtonPlaceholder} />;
    }
    
    return (
      <Toggler
        isExpanded={expanded[String(row.original.id)] || false}
        onClick={() => toggleRowExpanded(row.original.id)}
        direction="horizontal"
      />
    );
  }, [expanded, toggleRowExpanded]);

  const renderCheckbox = React.useCallback((row: any) => (
    <Checkbox
      checked={rowSelection[String(row.original.id)] || false}
      onChange={(e) => handleRowSelection(row.original.id, e.target.checked)}
    />
  ), [rowSelection, handleRowSelection]);

  const HeaderCheckbox = React.useCallback(({ table }: any) => {
    return (
      <div className={styles.cellWithIndent}>
        <div className={styles.expandButtonPlaceholder} />
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    );
  }, []);

  return React.useMemo(() => {
    const cols = [];

    if (enableRowSelection) {
      cols.push({
        id: DefaultColumnId.SELECT,
        size: 80,
        enableResizing: false,
        header: HeaderCheckbox,
        cell: ({ row }) => (
          <div className={styles.cellWithIndent}>
            {renderExpandToggle(row)}
            {renderCheckbox(row)}
          </div>
        ),
      });
    } else {
      cols.push({
        id: DefaultColumnId.EXPAND,
        size: 80,
        enableResizing: false,
        header: '',
        cell: ({ row }) => (
          <div className={styles.cellWithIndent}>
            {renderExpandToggle(row)}
          </div>
        ),
      });
    }

    const modifiedColumns = columns.map((col, index) => {
      if (!index) {
        col.cell = ({ getValue }) => {
          return (
            <div className={styles.cellWithIndent}>
              <div className={styles.cellContent}>
                {getValue()}
              </div>
            </div>
          );
        }
      }
      return col;
    });

    cols.push(...modifiedColumns);

    return cols;
  }, [
    columns,
    enableRowSelection,
    HeaderCheckbox,
    renderExpandToggle,
    renderCheckbox,
  ]);
};
