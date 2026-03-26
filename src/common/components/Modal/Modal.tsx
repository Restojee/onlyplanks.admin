import React from 'react';
import { useModal } from './ModalContext';
import type { ModalConfig } from './ModalContext';
import { DIContext } from '@common/hooks/useInjection';
import styles from './Modal.module.scss';
import { Row, Column } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';
import { ButtonIcon } from '@ui/ButtonIcon';
import classNames from 'clsx';

interface ModalItemProps {
  modal: ModalConfig;
}

const ModalItem: React.FC<ModalItemProps> = ({ modal }) => {
  const { closeModal } = useModal();
  const [isExiting, setIsExiting] = React.useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (modal.onCancel) {
        modal.onCancel();
      }
      closeModal(modal.id);
    }, 200);
  };

  const handleSuccess = async () => {
    if (modal.onSuccess) {
      await modal.onSuccess();
    }
    setIsExiting(true);
    setTimeout(() => {
      closeModal(modal.id);
    }, 200);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const renderContent = () => {
    let content: React.ReactNode;
    
    if (modal.component) {
      const Component = modal.component;
      content = <Component {...modal.options} onClose={handleClose} />;
    } else {
      content = modal.content;
    }

    if (modal.container) {
      return (
        <DIContext.Provider value={modal.container}>
          {content}
        </DIContext.Provider>
      );
    }
    
    return content;
  };


  return (
    <div
      className={classNames(
        styles.modalOverlay,
        isExiting && styles.exit
      )}
      onClick={handleOverlayClick}
    >
      <Column nonIntegration className={
        classNames(
          styles.modal,
          styles[modal.size],
          isExiting && styles.exit
        )
      }>
        <Row className={styles.header} justify="around" align="center" >
          <Typography size="lg" fontWeight="semiBold">{modal.title}</Typography>
          <ButtonIcon
            size="sm"
            className={styles.closeButton}
            onClick={handleClose}
            icon="IconReject"
            aria-label="Закрыть"
          />
        </Row>
        <Column nonIntegration className={styles.content} py="xs" px="sm">
          {renderContent()}
        </Column>
        {modal.showButtons && (
          <Row className={styles.footer} justify="end" gap="sm" py="xs" px="sm">
            <Button.Cancel
              label={modal.cancelLabel}
              onClick={handleClose}
            />
            <Button.Submit
              label={modal.successLabel}
              onClick={handleSuccess}
            />
          </Row>
        )}
      </Column>
    </div>
  );
};

export const ModalContainer: React.FC = () => {
  const { modals } = useModal();

  if (modals.length === 0) {
    return null;
  }

  return (
    <>
      {modals.map((modal) => (
        <ModalItem key={modal.id} modal={modal} />
      ))}
    </>
  );
};

export default ModalContainer;
