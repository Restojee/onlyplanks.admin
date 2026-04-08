import React from 'react';
import { ImageUploader } from '@ui/ImageUploader';
import { Button } from '@common/components/Button';
import { Popup } from '@ui/Popup';
import { Typography } from '@ui/Typography';
import { Column, Row } from '@ui/Layout';
import { EditableWrapper } from '@common/components/EditableWrapper';
import styles from './EditableImagePreview.module.scss';
import classNames from 'clsx';

export interface EditableImagePreviewProps {
  value: string ;
  onSave: (value: File) => void;
  className?: string;
  onlyPreview?: boolean;
}

export const EditableImagePreview: React.FC<EditableImagePreviewProps> = ({
  value,
  onSave,
  className,
  onlyPreview,
}) => {
  const [editValue, setEditValue] = React.useState<File >(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const handleSave = () => {
    if (editValue) {
      onSave(editValue);
    }
    setEditValue(null);
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setEditValue(null);
    setIsPopupOpen(false);
  };

  const handleImageChange = (file: File | null) => {
    setEditValue(file);
  };

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };
  
  React.useEffect(() => {
    if (onlyPreview) {
      handleEditClick()
    }
  }, [onlyPreview])

  const displayText = value ? value.split('/').pop() || 'Изображение' : 'Нет изображения';

  const textComponent =              (
    <Typography
      className={classNames(
        styles.text,
        !value && styles.placeholder
      )}
      ellipsis
    >
      {displayText}
    </Typography>
  );

  return (
    <Popup
      isVisible={isPopupOpen}
      onClose={handleCancel}
      anchor={
        onlyPreview ? textComponent : (
            <EditableWrapper
                className={className}
                onEditClick={handleEditClick}
            >
              { textComponent }
            </EditableWrapper>
        )
      }
      width={400}
    >
      <Column gap="sm">
        <Typography size="sm" fontWeight="bold">
          Обновление изображения
        </Typography>
        <Column gap="md">
          {value && (
            <Column gap="sm">
              <Typography size="sm">Текущее изображение:</Typography>
              <img src={value} alt="Current" className={styles.currentPreview} />
            </Column>
          )}
          <Column gap="sm">
            <Typography size="sm">Новое изображение:</Typography>
            <ImageUploader
              value={editValue}
              onChange={handleImageChange}
            />
          </Column>
        </Column>
        <Row gap="sm" style={{ justifyContent: 'flex-end' }}>
          <Button size="sm" onClick={handleSave} disabled={!editValue}>
            Сохранить
          </Button>
          <Button size="sm" onClick={handleCancel}>
            Отмена
          </Button>
        </Row>
      </Column>
    </Popup>
  );
};
