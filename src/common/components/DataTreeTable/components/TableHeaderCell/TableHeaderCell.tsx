import React from 'react';
import { Header, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { Toggler } from '@ui/Toggler';
import { HoverableIcon } from '../HoverableIcon';
import { TreeNode } from '../../types';
import styles from '../../DataTreeTable.module.scss';

interface TableHeaderCellProps<T> {
  header: Header<TreeNode<T>, unknown>;
  enableColumnResizing: boolean;
}

export const TableHeaderCell = <T,>({ header, enableColumnResizing }: TableHeaderCellProps<T>) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isSorted = header.column.getIsSorted();
  const canSort = header.column.getCanSort();

  return (
    <th
      className={styles.th}
      style={{
        width: header.getSize(),
        position: 'relative',
      }}
    >
      <div
        className={clsx(styles.headerContent, {
          [styles.sortable]: canSort,
        })}
        onClick={header.column.getToggleSortingHandler()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        
        {canSort && (
          <>
            {isSorted ? (
              <Toggler
                isExpanded={isSorted === 'desc'}
                direction="vertical"
                className={styles.sortToggler}
              />
            ) : (
              <HoverableIcon
                icon={
                  <Toggler
                    isExpanded={false}
                    direction="vertical"
                    className={styles.sortToggler}
                  />
                }
                isVisible={isHovered}
              />
            )}
          </>
        )}
      </div>
      
      {enableColumnResizing && header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={clsx(styles.resizer, {
            [styles.isResizing]: header.column.getIsResizing(),
          })}
        />
      )}
    </th>
  );
};
