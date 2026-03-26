import React from 'react';
import { ButtonIcon } from '@ui/ButtonIcon';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import styles from './EditableCell.module.scss';
import { ThemeSizes } from '@common/themes/common/types';
import classNames from 'clsx';
import { flexRender } from '@tanstack/react-table';
import type { CellContext } from '@tanstack/react-table';
import type { TreeNode } from '../../types';

export type EditableCellEditorProps = {
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  size: ThemeSizes;
  onSave?: (value: unknown) => void;
  onCancel?: () => void;
};

type DefaultEditorProps = {
  value: unknown;
  onChange: (next: unknown) => void;
  onBlur: () => void;
  placeholder?: string;
  size?: ThemeSizes;
  rowId?: string | number;
  columnId?: string;
  rowData?: unknown;
};

export const DefaultEditor: React.FC<DefaultEditorProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  size = 'md',
}) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <InputText
      value={String(value )}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder}
      size={size}
      integrated
      noBorder
      noPadding
      noHover
      className={styles.text}
    />
  );
};

export interface EditableCellProps {
  value: unknown;
  isEditing: boolean;
  isAnyEditing: boolean;
  onStartEdit: () => void;
  onSave: (value: unknown) => void;
  onCancel: () => void;
  placeholder?: string;
  size?: ThemeSizes;
  className?: string;
  style?: React.CSSProperties;
  cellContext?: CellContext<TreeNode<unknown>, unknown>;
  editableComponent: (props: EditableCellEditorProps) => React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  isAnyEditing,
  onStartEdit,
  onSave,
  onCancel,
  placeholder,
  className,
  size = 'md',
  style,
  cellContext,
  editableComponent,
}) => {
  const contentSize: ThemeSizes = 'md';
  const [hovered, setHovered] = React.useState(false);
  const [editValue, setEditValue] = React.useState<unknown>(value);

  React.useEffect(() => {
    if (isEditing) {
      setEditValue(value);
    }
  }, [isEditing, value]);

  const handleEditorChange = React.useCallback((next: unknown) => {
    setEditValue(next);
  }, []);

  const handleSave = React.useCallback(() => {
    onSave(editValue);
  }, [editValue, onSave]);

  const handleMouseEnter = React.useCallback((): void => {
    setHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback((): void => {
    setHovered(false);
  }, []);

  const handleContentClick = React.useCallback((e: React.MouseEvent): void => {
    // Останавливаем всплытие чтобы клик по ячейке не вызывал клик по строке
    e.stopPropagation();
  }, []);

  const handleStartEdit = React.useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    onStartEdit();
  }, [onStartEdit]);

  const handleSaveWithStop = React.useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    handleSave();
  }, [handleSave]);

  const handleCancelWithStop = React.useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    onCancel();
  }, [onCancel]);

  const handleEditClick = React.useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    onStartEdit();
  }, [onStartEdit]);

  const handleClick = React.useCallback((e: React.MouseEvent): void => {
    isEditing && e.stopPropagation();
  }, [isEditing]);

  return (
    <td
      style={style}
      className={classNames(className, styles.editableCell, isEditing && styles.editing)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.cellContent}>
        {!isEditing && hovered && !isAnyEditing && (
          <ButtonIcon
            icon="IconEdit"
            onClick={handleEditClick}
            onMouseDown={handleEditClick}
            size={contentSize}
            tooltip="Редактировать"
            className={styles.editIcon}
          />
        )}

        {isEditing && (
          <div className={styles.editingActions} onClick={handleEditClick}>
            <ButtonIcon
              icon="IconCheck"
              onClick={handleSaveWithStop}
              onMouseDown={handleSaveWithStop}
              size={contentSize}
              tooltip="Сохранить"
            />
            <ButtonIcon
              icon="IconReject"
              onClick={handleCancelWithStop}
              onMouseDown={handleCancelWithStop}
              size={contentSize}
              tooltip="Отменить"
            />
          </div>
        )}

        {isEditing ? (
          editableComponent({
            value: editValue,
            onChange: handleEditorChange,
            onBlur: onCancel,
            size: contentSize,
            onSave: (v) => onSave(v),
            onCancel: onCancel,
          })
        ) : (
          <span className={styles.text} onClick={handleStartEdit}>
            {cellContext ? flexRender(cellContext.column.columnDef.cell, cellContext) : String(value ?? placeholder )}
          </span>
        )}
      </div>
    </td>
  );
};
