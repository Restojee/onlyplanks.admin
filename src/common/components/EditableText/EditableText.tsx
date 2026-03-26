import React from 'react';
import { Typography } from '@ui/Typography';
import { ThemeSizes } from '@common/themes/common/types';
import clsx from 'clsx';
import classNames from 'clsx';
import styles from './EditableText.module.scss';

export interface EditableTextProps {
  value: string;
  onSave?: (value: string) => void;
  onStartEdit?: () => void;
  onCancel?: () => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isEditing?: boolean;
  isAnyEditing?: boolean;
  size?: ThemeSizes;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  onCancel,
  onValueChange,
  placeholder,
  isEditing = false,
  size = 'md',
  className,
  onStartEdit,
}) => {
  const [editValue, setEditValue] = React.useState(value);
  const editableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.textContent = editValue;
      editableRef.current.focus();
      if (editableRef.current) {
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }, [isEditing]);

  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave?.(editValue.trim());
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel?.();
  };

  const handleBlur = () => {
    handleCancel();
  };
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent;
    setEditValue(newValue);
    onValueChange?.(newValue);
  };

  if (isEditing) {
    return (
      <div className={classNames(
        styles.editingContainer,
        className
      )}>
        <div
          className={clsx(styles.editableInput, {
            [styles.sizeSm]: size === 'sm',
            [styles.sizeMd]: size === 'md',
          })}
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleBlur}
          data-placeholder={placeholder}
        >
          {!isEditing ? editValue : null}
        </div>
      </div>
    );
  }

  return (
    <Typography
      ellipsis
      className={classNames(
        className,
        styles.text,
        !value && placeholder && styles.disabled
      )}
      onClick={onStartEdit}
    >
      {value || placeholder}
    </Typography>
  );
};

export default EditableText;
