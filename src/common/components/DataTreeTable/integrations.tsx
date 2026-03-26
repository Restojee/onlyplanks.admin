import React from 'react';
import type { IntegrateRenderer, IntegrateRenderProps } from './hooks/useCellIntegrations';
import { EditableCell } from './components/EditableCell';
import styles from './DataTreeTable.module.scss';

export type EditableIntegrateComponentProps<TData = unknown> = {
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  onSave?: (value: unknown) => void;
  onCancel?: () => void;
  rowId: string | number;
  columnId: string;
  rowData: TData;
};

export const editable = <TData = unknown>(
  Component: React.FC<EditableIntegrateComponentProps<TData>>
): IntegrateRenderer<TData> => {
  return (props: IntegrateRenderProps<TData>) => {
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
        editableComponent={(editorProps) => (
          <Component
            value={editorProps.value}
            onChange={editorProps.onChange}
            onBlur={editorProps.onBlur}
            onSave={editorProps.onSave}
            onCancel={editorProps.onCancel}
            rowId={props.rowId}
            columnId={props.columnId}
            rowData={props.rowData}
          />
        )}
      />
    );
  };
};

type SelectableComponentProps = {
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  size?: 'sm' | 'md';
  integrated?: boolean;
  nonIntegration?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  allowClear?: boolean;
};

export const selectable = <TData = unknown>(
  Component: React.ComponentType<SelectableComponentProps>
): IntegrateRenderer<TData> => {
  return (props: IntegrateRenderProps<TData>) => {
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
        editableComponent={(editorProps) => (
          <Component
            value={editorProps.value}
            onChange={editorProps.onChange}
            onBlur={undefined}
            integrated={true}
            nonIntegration={false}
            noBorder={true}
            noPadding={true}
            noHover={true}
            allowClear={false}
          />
        )}
      />
    );
  };
};
