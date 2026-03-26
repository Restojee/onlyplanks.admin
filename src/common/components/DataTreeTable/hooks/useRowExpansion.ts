import { useCallback } from 'react';
import { ExpandedState as TanStackExpandedState } from '@tanstack/react-table';
import { TreeNode } from '../types';

interface UseRowExpansionProps<T> {
  flattenedData: TreeNode<T>[];
  setExpanded: React.Dispatch<React.SetStateAction<TanStackExpandedState>>;
}

export const useRowExpansion = <T,>({ flattenedData, setExpanded }: UseRowExpansionProps<T>) => {
  const toggleRowExpanded = useCallback(
    (rowId: string | number) => {
      setExpanded((prev) => {
        const newExpanded = Object.assign({}, prev);
        const isExpanding = !prev[String(rowId)];
        newExpanded[String(rowId)] = isExpanding;

        
        if (!isExpanding) {
          const collapseDescendants = (parentId: string | number) => {
            flattenedData.forEach((row) => {
              if (row.parentId === parentId) {
                newExpanded[String(row.id)] = false;
                if (row.children && row.children.length > 0) {
                  collapseDescendants(row.id);
                }
              }
            });
          };
          collapseDescendants(rowId);
        }
        

        return newExpanded;
      });
    },
    [flattenedData, setExpanded]
  );

  return { toggleRowExpanded };
};
