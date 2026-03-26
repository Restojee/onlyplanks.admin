import React from 'react';
import { Modal } from './ModalEventBus';
import type { ModalSize } from './ModalContext';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { Row, Column } from '@ui/Layout';

interface ConfirmContentProps {
  text: string;
  onClose?: () => void;
  onSuccess?: () => void | Promise<void>;
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({ text, onClose, onSuccess }) => {
  const handleConfirm = async () => {
    try {
      if (onSuccess) {
        await onSuccess();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
       console.error('Confirm action failed:', error);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Column gap="lg" py="xs" px="sm">
      {text && <Typography size="md">{text}</Typography>}
      <Row justify="end" gap="sm">
        <Button.Cancel 
          label="Отмена"
          variant="secondary"
          onClick={handleCancel}
        />
        <Button
          variant="primary"
          label="Подтвердить"
          onClick={handleConfirm}
        />
      </Row>
    </Column>
  );
};

export interface ShowConfirmOptions {
  text: string;
  size?: ModalSize;
  onSuccess?: () => void | Promise<void>;
  onClose?: () => void;
}

export const showConfirm = (title: string, options: ShowConfirmOptions): string => {
  const modalId = Modal.show(title, {
    size: options.size || 'sm',
    component: ConfirmContent,
    options: {
      text: options.text,
      onSuccess: () => {
        options.onSuccess()
      },
      onClose: () => {
        Modal.close(modalId);
        if (options.onClose) {
          options.onClose();
        }
      },
    },
    onClose: options.onClose,
  });

  return modalId;
};
