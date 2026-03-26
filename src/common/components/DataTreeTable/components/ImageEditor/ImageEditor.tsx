import React from 'react';
import { Column } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { ImageUploader } from '@ui/ImageUploader';
import type { EditableIntegrateComponentProps } from '@common/components/DataTreeTable/integrations';
import { useModal } from '@common/components/Modal/ModalContext';

export const ImageEditor: React.FC<EditableIntegrateComponentProps> = ({
  value,
  onChange,
  onSave,
  onCancel,
}) => {
  const currentUrl = String(value);
  const currentName = currentUrl ? currentUrl.split('/').pop() : '';

  const { showModal, closeModal } = useModal();
  const modalIdRef = React.useRef<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = React.useCallback((next: File | null) => {
    setFile(next);
    if (next) {
      onChange(next);
    }
  }, [onChange]);

  const handleModalCancel = React.useCallback(() => {
    if (modalIdRef.current) {
      closeModal(modalIdRef.current);
      modalIdRef.current = null;
    }
    onCancel?.();
  }, [closeModal, onCancel]);

  const handleModalSuccess = React.useCallback(() => {
    if (!file) {
      handleModalCancel();
      return;
    }

    onSave?.(file);

    if (modalIdRef.current) {
      closeModal(modalIdRef.current);
      modalIdRef.current = null;
    }
  }, [closeModal, file, handleModalCancel, onSave]);

  React.useEffect(() => {
    modalIdRef.current = showModal('Обновить изображение', {
      size: 'md',
      showButtons: true,
      successLabel: 'Сохранить',
      cancelLabel: 'Отмена',
      onSuccess: handleModalSuccess,
      onCancel: handleModalCancel,
      content: (
        <Column gap="sm">
          {currentName && (
            <Typography size="sm">
              {currentName}
            </Typography>
          )}

          <ImageUploader
            value={null}
            onChange={handleFileChange}
          />
        </Column>
      ),
    });

    return () => {
      if (modalIdRef.current) {
        closeModal(modalIdRef.current);
        modalIdRef.current = null;
      }
    };
  }, []);

  return (
    <Column gap="sm">
      <Typography size="md">{currentName}</Typography>
    </Column>
  );
};

export default ImageEditor;
