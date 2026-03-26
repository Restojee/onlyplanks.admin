import { useState } from 'react';
import {
  SortingState,
  ExpandedState as TanStackExpandedState,
  ColumnSizingState,
  ColumnResizeMode,
} from '@tanstack/react-table';
import { SelectionState } from '../types';

export const useTableState = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<TanStackExpandedState>({} as TanStackExpandedState);
  const [rowSelection, setRowSelection] = useState<SelectionState>({});
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [containerWidth, setContainerWidth] = useState<number>(0);

  return {
    sorting,
    setSorting,
    expanded,
    setExpanded,
    rowSelection,
    setRowSelection,
    columnResizeMode,
    columnSizing,
    setColumnSizing,
    containerWidth,
    setContainerWidth,
  };
};
