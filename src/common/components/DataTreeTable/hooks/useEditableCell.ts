import { useState, useCallback } from 'react';
import type { RowType } from '@common/store/entity/EntityManager';

export interface UseEditableCellOptions<TData> {
  onEdit?: (rowId: RowType, columnId: string, value: unknown, rowData: TData) => void;
  onCancel?: () => void;
}
export const useEditableCell = <TData = unknown>(
  options: UseEditableCellOptions<TData> = {}
) => {
  const { onEdit, onCancel } = options;
  const [editingCellId, setEditingCellId] = useState<string >(null);

  const getCellId = (rowId: string | number, columnId: string): string => {
    return `${rowId}-${columnId}`;
  };

  const startEditing = useCallback((rowId: string | number, columnId: string) => {
    setEditingCellId(getCellId(rowId, columnId));
  }, []);

  const stopEditing = useCallback(() => {
    setEditingCellId(null);
    onCancel?.();
  }, [onCancel]);

  const isEditing = useCallback((rowId: string | number, columnId: string): boolean => {
    return editingCellId === getCellId(rowId, columnId);
  }, [editingCellId]);

  const isAnyEditing = useCallback((): boolean => {
    return editingCellId !== null;
  }, [editingCellId]);

  const handleSave = useCallback((
    rowId: string | number,
    columnId: string,
    value: unknown,
    rowData: TData
  ) => {
    onEdit?.(rowId, columnId, value, rowData);
    stopEditing();
  }, [onEdit, stopEditing]);

  return {
    editingCellId,
    startEditing,
    stopEditing,
    isEditing,
    isAnyEditing,
    handleSave,
  };
};

export default useEditableCell;
