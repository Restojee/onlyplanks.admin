import React from 'react';
import { ButtonIcon } from '@ui/ButtonIcon';
import classNames from 'clsx';
import styles from './EditableWrapper.module.scss';

export interface EditableWrapperProps {
  children: React.ReactNode;
  onEditClick?: () => void;
  className?: string;
  showEditButton?: boolean;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  onEditClick,
  className,
  showEditButton = true,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={classNames(styles.viewContainer, className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && showEditButton && onEditClick && (
        <ButtonIcon
          icon="IconEdit"
          onClick={onEditClick}
          size="sm"
          tooltip="Редактировать"
        />
      )}
      {children}
    </div>
  );
};

export default EditableWrapper;
