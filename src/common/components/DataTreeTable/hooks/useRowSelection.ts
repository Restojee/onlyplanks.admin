import { useCallback } from 'react';
import { TreeNode, SelectionState } from '../types';

interface UseRowSelectionProps<T> {
  flattenedData: TreeNode<T>[];
  setRowSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
}

export const useRowSelection = <T,>({ flattenedData, setRowSelection }: UseRowSelectionProps<T>) => {
  const handleRowSelection = useCallback(
    (rowId: string | number, checked: boolean) => {
      const updateSelection = (id: string | number, isChecked: boolean, newSelection: SelectionState) => {
        newSelection[String(id)] = isChecked;
        
        const row = flattenedData.find((r) => r.id === id);
        if (row?.children) {
          row.children.forEach((child: TreeNode<T>) => {
            updateSelection(child.id, isChecked, newSelection);
          });
        }
      };

      setRowSelection((prev) => {
        const newSelection = { ...prev };
        updateSelection(rowId, checked, newSelection);
        return newSelection;
      });
    },
    [flattenedData, setRowSelection]
  );

  return { handleRowSelection };
};
