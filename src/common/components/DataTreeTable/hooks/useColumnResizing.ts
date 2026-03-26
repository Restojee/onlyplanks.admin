import { useCallback } from 'react';
import { ColumnSizingState } from '@tanstack/react-table';

interface UseColumnResizingProps {
  tableColumns: any[];
  containerWidth: number;
  setColumnSizing: React.Dispatch<React.SetStateAction<ColumnSizingState>>;
}

export const useColumnResizing = ({
                                    tableColumns,
                                    
                                    setColumnSizing,
                                  }: UseColumnResizingProps) => {
  const handleColumnSizingChange = useCallback((updater: any) => {
    setColumnSizing((old) => {
      const newSizing = typeof updater === 'function' ? updater(old) : updater;

      const changedColumnId = Object.keys(newSizing).find(
        (key) => newSizing[key] !== old[key]
      );

      if (!changedColumnId) return newSizing;

      
      const changedColIndex = tableColumns.findIndex((c: any) => c.id === changedColumnId);

      
      if (changedColIndex === -1 || changedColIndex === tableColumns.length - 1) {
        return old;
      }

      const minSize = 80; 

      
      const nextColumn = tableColumns[changedColIndex + 1];
      const nextColumnId = nextColumn.id;

      
      const currentOldSize = old[changedColumnId] || tableColumns[changedColIndex].size || 0;
      const nextOldSize = old[nextColumnId] || nextColumn.size || 0;

      
      const requestedNewSize = newSizing[changedColumnId] || 0;
      let delta = requestedNewSize - currentOldSize;

      
      

      if (delta > 0) {
        
        const availableSpaceInNext = nextOldSize - minSize;

        
        if (delta > availableSpaceInNext) {
          delta = availableSpaceInNext;
        }
      } else {
        
        const availableSpaceInCurrent = currentOldSize - minSize;

        
        if (Math.abs(delta) > availableSpaceInCurrent) {
          delta = -availableSpaceInCurrent;
        }
      }

      
      if (Math.abs(delta) < 0.5) return old;

      
      const result = { ...old };
      result[changedColumnId] = currentOldSize + delta;
      result[nextColumnId] = nextOldSize - delta;

      return result;
    });
  }, [tableColumns]);

  return { handleColumnSizingChange };
};
