import React from 'react';
import type { Cell, Row } from '@tanstack/react-table';
import type { TreeNode } from '../types';
import { EditableCell, DefaultEditor } from '../components/EditableCell';
import styles from '../DataTreeTable.module.scss';
import type { ThemeSizes } from '@common/themes/common/types';

export type IntegrateType = 'editable' | string;

export interface IntegrateRenderProps<TData> {
  cell: Cell<TreeNode<any>, unknown>;
  rowId: string | number;
  columnId: string;
  cellValue: unknown;
  rowData: TData;
  width: number;
  size: ThemeSizes;
  isEditing: boolean;
  isAnyEditing: boolean;
  startEditing: () => void;
  save: (value: unknown) => void;
  cancel: () => void;
}

export interface IntegrateRenderer<TData> {
  (props: IntegrateRenderProps<TData>): React.ReactElement;
}

export const useCellIntegrations = <TData,>(options: {
  isEditing: (rowId: string | number, columnId: string) => boolean;
  isAnyEditing: () => boolean;
  startEditing: (rowId: string | number, columnId: string) => void;
  stopEditing: () => void;
  handleSave: (rowId: string | number, columnId: string, value: unknown, rowData: TData) => void;
  size: ThemeSizes;
}) => {
  const { isEditing, isAnyEditing, startEditing, stopEditing, handleSave, size } = options;

  const getBuiltInRenderer = React.useCallback((integrate: IntegrateType): IntegrateRenderer<TData>  => {
    if (integrate === 'editable') {
      return (props) => {
        const editableComponent = props.cell.column.columnDef.meta?.editableComponent;

        if (editableComponent) {
          return (
            <EditableCell
              key={props.cell.id}
              className={styles.td}
              style={{ width: props.width }}
              cellContext={props.cell.getContext()}
              value={props.cellValue}
              isEditing={props.isEditing}
              isAnyEditing={props.isAnyEditing}
              onStartEdit={props.startEditing}
              onSave={props.save}
              onCancel={props.cancel}
              size={props.size}
              editableComponent={editableComponent}
            />
          );
        }

        return (
          <EditableCell
            key={props.cell.id}
            className={styles.td}
            style={{ width: props.width }}
            cellContext={props.cell.getContext()}
            value={props.cellValue}
            isEditing={props.isEditing}
            isAnyEditing={props.isAnyEditing}
            onStartEdit={props.startEditing}
            onSave={(v) => props.save(v)}
            onCancel={props.cancel}
            size={props.size}
            editableComponent={(editorProps) => (
              <DefaultEditor
                value={editorProps.value}
                onChange={editorProps.onChange}
                onBlur={editorProps.onBlur}
                size={editorProps.size}
                placeholder="Введите значение"
              />
            )}
          />
        );
      };
    }

    return null;
  }, []);

  const renderIntegratedCell = React.useCallback((cell: Cell<TreeNode<any>, unknown>, row: Row<TreeNode<TData>>) => {
    const columnDef = cell.column.columnDef as any;
    const meta = columnDef?.meta as any;
    const integrate = columnDef?.integrate ?? meta?.integrate;

    if (!integrate) {
      return null;
    }

    const cellValue = cell.getValue();
    const rowId = row.id as string | number;
    const columnId = cell.column.id;
    const width = cell.column.getSize();
    const editing = isEditing(rowId, columnId);

    const commonProps: IntegrateRenderProps<TData> = {
      cell,
      rowId,
      columnId,
      cellValue,
      rowData: row.original.data,
      width,
      size,
      isEditing: editing,
      isAnyEditing: isAnyEditing(),
      startEditing: () => startEditing(rowId, columnId),
      save: (value: unknown) => handleSave(rowId, columnId, value, row.original.data),
      cancel: stopEditing,
    };

    if (typeof integrate === 'function') {
      return integrate(commonProps);
    }

    const renderer = getBuiltInRenderer(integrate);
    return renderer ? renderer(commonProps) : null;
  }, [getBuiltInRenderer, handleSave, isAnyEditing, isEditing, startEditing, stopEditing]);

  return {
    renderIntegratedCell,
  };
};

export default useCellIntegrations;
