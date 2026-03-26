import { useEffect, useRef } from 'react';
import { SortingState, ExpandedState as TanStackExpandedState } from '@tanstack/react-table';
import { SelectionState } from '../types';

interface UseTableEffectsProps {
  defaultExpanded: boolean;
  flattenedData: any[];
  setExpanded: React.Dispatch<React.SetStateAction<TanStackExpandedState>>;
  sorting: SortingState;
  onSort?: (sorting: SortingState) => void;
  expanded: TanStackExpandedState;
  onRowExpand?: (expandedIds: Set<string | number>) => void;
  rowSelection: SelectionState;
  onRowCheck?: (checkedRows: any[]) => void;
}

export const useTableEffects = ({
  defaultExpanded,
  flattenedData,
  setExpanded,
  sorting,
  onSort,
  expanded,
  onRowExpand,
  rowSelection,
  onRowCheck,
}: UseTableEffectsProps) => {
  const isInitialMount = useRef(true);
  const flattenedDataRef = useRef<any[]>([]);

  useEffect(() => {
    flattenedDataRef.current = flattenedData;
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [flattenedData]);

  useEffect(() => {
    if (defaultExpanded && flattenedData.length > 0) {
      const allIds = flattenedData.reduce((acc, row) => {
        if (row.hasChildren) {
          acc[String(row.id)] = true;
        }
        return acc;
      }, {} as TanStackExpandedState);
      setExpanded(allIds);
    }
  }, [defaultExpanded]);

  useEffect(() => {
    if (isInitialMount.current || !onSort) return;
    if (sorting.length > 0) {
      onSort(sorting);
    }
  }, [sorting, onSort]);

  useEffect(() => {
    if (isInitialMount.current || !onRowExpand) return;
    const expandedIds = new Set(
      Object.keys(expanded).filter((key) => expanded[key])
    );
    onRowExpand(expandedIds);
  }, [expanded, onRowExpand]);

  useEffect(() => {
    if (isInitialMount.current || !onRowCheck) return;
    const checkedRows = flattenedDataRef.current.filter((row) => rowSelection[String(row.id)]);
    onRowCheck(checkedRows);
  }, [rowSelection, onRowCheck]);
};
