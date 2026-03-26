import { useMemo } from 'react';
import { ExpandedState as TanStackExpandedState } from '@tanstack/react-table';
import { TreeNode } from '../types';

interface UseVisibleDataProps<T> {
  flattenedData: TreeNode<T>[];
  expanded: TanStackExpandedState;
}

export const useVisibleData = <T,>({ flattenedData, expanded }: UseVisibleDataProps<T>) => {
  return useMemo(() => {
    const rowMap = new Map<string | number, any>();
    flattenedData.forEach((row) => rowMap.set(row.id, row));

    const childrenByParent = new Map<string | number , any[]>();
    flattenedData.forEach((row) => {
      const parentId = row.parentId ?? null;
      if (!childrenByParent.has(parentId)) {
        childrenByParent.set(parentId, []);
      }
      childrenByParent.get(parentId)!.push(row);
    });

    const isRowVisible = (row: any, visited = new Set<string | number>()): boolean => {
      if (row.level === 0) return true;
      const rowKey = String(row.id);
      if (visited.has(rowKey)) return false;
      visited.add(rowKey);
      const parent = rowMap.get(row.parentId);
      if (!parent) return false;
      const parentExpanded = expanded[String(parent.id)];
      if (!parentExpanded) return false;
      return isRowVisible(parent, visited);
    };

    const buildVisibleTree = (parentId: string | number  = null): any[] => {
      const children = childrenByParent.get(parentId) || [];
      const result: any[] = [];
      children.forEach((child) => {
        if (isRowVisible(child)) {
          result.push(child);
          if (expanded[String(child.id)] && child.hasChildren) {
            result.push(...buildVisibleTree(child.id));
          }
        }
      });
      return result;
    };

    return buildVisibleTree();
  }, [flattenedData, expanded]);
};
