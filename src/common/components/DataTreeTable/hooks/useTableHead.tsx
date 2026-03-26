import React from 'react';
import { Table } from '@tanstack/react-table';
import { TreeNode } from '../types';
import { TableHeaderCell } from '../components/TableHeaderCell';
import styles from '../DataTreeTable.module.scss';

interface UseTableHeadProps<T> {
  table: Table<TreeNode<T>>;
  enableColumnResizing: boolean;
}

export const useTableHead = <T,>({ table, enableColumnResizing }: UseTableHeadProps<T>) => {
  const renderTableHead = React.useCallback(() => {
    return (
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.headerRow}>
            {headerGroup.headers.map((header) => (
              <TableHeaderCell
                key={header.id}
                header={header}
                enableColumnResizing={enableColumnResizing}
              />
            ))}
          </tr>
        ))}
      </thead>
    );
  }, [table, enableColumnResizing]);

  return { renderTableHead };
};
