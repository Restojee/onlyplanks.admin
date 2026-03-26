import { useMemo } from 'react';
import { TreeNode } from '../types';

export const useTableData = <T>(data: TreeNode<T>[]) => {
  const flattenedData = useMemo(() => {
    const flatten = (nodes: TreeNode<T>[], level = 0, parentId: string | number  = null): any[] => {
      return nodes.reduce((acc, node) => {
        const flatNode = {
          ...node,
          level,
          parentId,
          hasChildren: !!node.children && node.children.length > 0,
        };
        acc.push(flatNode);

        if (node.children && node.children.length > 0) {
          const childNodes = flatten(node.children, level + 1, node.id);
          acc.push(...childNodes);
        }

        return acc;
      }, [] as any[]);
    };

    return flatten(data);
  }, [data]);

  return { flattenedData };
};
