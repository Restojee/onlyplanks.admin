import { useCallback } from 'react';
import { ExpandedState as TanStackExpandedState } from '@tanstack/react-table';
import { SelectionState } from '../types';

interface UseTableCallbacksProps {
  setExpanded: React.Dispatch<React.SetStateAction<TanStackExpandedState>>;
  setRowSelection: React.Dispatch<React.SetStateAction<SelectionState>>;
  flattenedData: any[];
}

export const useTableCallbacks = ({
  setExpanded,
  setRowSelection,
  flattenedData,
}: UseTableCallbacksProps) => {
  const toggleRowExpanded = useCallback(
    (rowId: string | number) => {
      setExpanded((prev: TanStackExpandedState) => {
        const updated: TanStackExpandedState = { ...prev as {} };
        updated[String(rowId)] = !prev[String(rowId)];
        return updated;
      });
    },
    [setExpanded]
  );

  const handleRowSelection = useCallback(
    (rowId: string | number, checked: boolean) => {
      const updateSelection = (
        targetId: string | number,
        isChecked: boolean,
        selection: SelectionState
      ) => {
        selection[String(targetId)] = isChecked;

        const children = flattenedData.filter((row) => row.parentId === targetId);
        children.forEach((child) => {
          updateSelection(child.id, isChecked, selection);
        });
      };

      setRowSelection((prev) => {
        const newSelection = { ...prev };
        updateSelection(rowId, checked, newSelection);
        return newSelection;
      });
    },
    [flattenedData, setRowSelection]
  );

  return {
    toggleRowExpanded,
    handleRowSelection,
  };
};
