import { useMemo } from 'react';
import { ColumnDef, ColumnSizingState } from '@tanstack/react-table';

interface UseInitialColumnSizingProps {
  tableColumns: ColumnDef<any>[];
  containerWidth: number;
  enableRowSelection: boolean;
}

export const useInitialColumnSizing = ({
  tableColumns,
  containerWidth,
  enableRowSelection,
}: UseInitialColumnSizingProps): ColumnSizingState => {
  return useMemo(() => {
    if (containerWidth === 0 || tableColumns.length === 0) return {};

    const sizing: ColumnSizingState = {};
    let totalFixedWidth = 0;
    const columnsWithPercentage: Array<{ id: string; percentage: number }> = [];
    const columnsWithoutSize: string[] = [];

    tableColumns.forEach((col) => {
      if (col.size !== undefined) {
        const size = col.size;

        if (size > 0 && size < 1) {
          const percentage = size * 100;
          columnsWithPercentage.push({ id: col.id, percentage });
        }
        else if (size >= 1) {
          sizing[col.id] = size;
          totalFixedWidth += size;
        }
        else {
          columnsWithoutSize.push(col.id);
        }
      } else {
        columnsWithoutSize.push(col.id);
      }
    });

    const availableWidth = containerWidth - totalFixedWidth;
    let totalPercentageWidth = 0;

    const totalPercentage = columnsWithPercentage.reduce((sum, col) => sum + col.percentage, 0);
    
    columnsWithPercentage.forEach(({ id, percentage }) => {
      const width = (availableWidth * percentage) / totalPercentage;
      sizing[id] = width;
      totalPercentageWidth += width;
    });

    if (columnsWithoutSize.length > 0) {
      const remainingWidth = availableWidth - totalPercentageWidth;
      const widthPerColumn = remainingWidth / columnsWithoutSize.length;

      columnsWithoutSize.forEach((columnId) => {
        sizing[columnId] = widthPerColumn;
      });
    }

    return sizing;
  }, [tableColumns, containerWidth, enableRowSelection]);
};
