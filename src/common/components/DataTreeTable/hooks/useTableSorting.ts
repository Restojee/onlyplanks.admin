import React from 'react';
import { SortingState } from '@tanstack/react-table';
import { SortDirection } from '@common/types/sorting';

interface UseTableSortingProps {
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (field: string, direction: SortDirection ) => void;
}

export const useTableSorting = ({ sortColumn, sortDirection, onSort }: UseTableSortingProps) => {
  const getInitialSorting = (): SortingState => {
    if (sortColumn && sortDirection) {
      return [{ id: sortColumn, desc: sortDirection === SortDirection.DESC }];
    }
    return [];
  };

  const [sorting, setSorting] = React.useState<SortingState>(getInitialSorting());
  const handleSortingChange = React.useCallback((newSorting: SortingState) => {
    setSorting(newSorting);
    
    if (!onSort || newSorting.length === 0) return;
    
    const [sort] = newSorting;
    if (sort) {
      onSort(sort.id, sort.desc ? SortDirection.DESC : SortDirection.ASC);
    }
  }, [onSort]);

  React.useEffect(() => {
    if (sortColumn && sortDirection) {
      const newSorting: SortingState = [{ id: sortColumn, desc: sortDirection === SortDirection.DESC }];
      setSorting(newSorting);
    } else if (!sortColumn && !sortDirection) {
      setSorting([]);
    }
  }, [sortColumn, sortDirection]);

  return { handleSortingChange, sorting };
};
