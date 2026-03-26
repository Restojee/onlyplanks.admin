import React from 'react';
import { flexRender } from '@tanstack/react-table';
import type { CellContext } from '@tanstack/react-table';
import { ButtonIcon } from '@ui/ButtonIcon';
import styles from './EditableCellWithCustom.module.scss';
import classNames from 'clsx';
import { ThemeSizes } from '@common/themes/common/types';
import type { TreeNode } from '../../types';

type EditableComponentProps = {
  value: unknown;
  isEditing: boolean;
  isAnyEditing: boolean;
  onStartEdit: () => void;
  onSave: (value: unknown) => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export interface EditableCellWithCustomProps<TData = unknown> {
  cellContext: CellContext<TreeNode<TData>, unknown>;
  isEditing: boolean;
  isAnyEditing: boolean;
  onStartEdit: () => void;
  onSave: (value: unknown) => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  size?: ThemeSizes;
  editableComponent: (props: EditableComponentProps) => React.ReactElement;
}

export const EditableCell = <TData,>({
  cellContext,
  isEditing,
  isAnyEditing,
  onStartEdit,
  onSave,
  onCancel,
  className,
  style,
  size = 'md',
  editableComponent,
}: EditableCellWithCustomProps<TData>) => {
  const [hovered, setHovered] = React.useState(false);

  
  if (isEditing) {
    return editableComponent({
      value: cellContext.getValue(),
      isEditing,
      isAnyEditing,
      onStartEdit,
      onSave,
      onCancel,
      className,
      style,
    });
  }

  
  return (
    <td 
      style={style}
      className={classNames(className, styles.editableCell)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cellContent}>
        {hovered && !isAnyEditing && (
          <ButtonIcon
            icon="IconEdit"
            onClick={onStartEdit}
            size={size}
            tooltip="Редактировать"
            className={styles.editIcon}
          />
        )}
        {flexRender(cellContext.column.columnDef.cell, cellContext)}
      </div>
    </td>
  );
};
