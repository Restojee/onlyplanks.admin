import type { ModalConfig, ModalSize } from './ModalContext';
import { ReactNode } from 'react';
import { Instances } from '@common/instances/Instances';

type ShowModalHandler = (title: string, config?: Partial<Omit<ModalConfig, 'id' | 'title'>>, container?: Instances) => string;
type CloseModalHandler = (id: string) => void;
type CloseAllModalsHandler = () => void;

class ModalEventBus {
  private showModalHandler: ShowModalHandler  = null;
  private closeModalHandler: CloseModalHandler  = null;
  private closeAllModalsHandler: CloseAllModalsHandler  = null;
  private currentModalId: string  = null;

  public registerHandler(
    showModal: ShowModalHandler,
    closeModal: CloseModalHandler,
    closeAllModals: CloseAllModalsHandler
  ): void {
    this.showModalHandler = showModal;
    this.closeModalHandler = closeModal;
    this.closeAllModalsHandler = closeAllModals;
  }

  public unregisterHandler(): void {
    this.showModalHandler = null;
    this.closeModalHandler = null;
    this.closeAllModalsHandler = null;
  }

  public show(
    title: string,
    config?: {
      size?: ModalSize;
      onSuccess?: () => void | Promise<void>;
      onClose?: () => void;
      content?: ReactNode;
      component?: React.ComponentType<any>;
      options?: any;
    },
    container?: Instances
  ): string {
    if (this.showModalHandler) {
      this.currentModalId = this.showModalHandler(title, config, container);
      return this.currentModalId;
    } else {
      console.warn('[ModalEventBus] Handler not registered');
      return '';
    }
  }

  public close(id?: string): void {
    if (this.closeModalHandler) {
      if (id) {
        this.closeModalHandler(id);
        if (this.currentModalId === id) {
          this.currentModalId = null;
        }
      } else if (this.currentModalId) {
        this.closeModalHandler(this.currentModalId);
        this.currentModalId = null;
      }
    } else {
      console.warn('[ModalEventBus] Handler not registered');
    }
  }

  public closeAll(): void {
    if (this.closeAllModalsHandler) {
      this.closeAllModalsHandler();
      this.currentModalId = null;
    } else {
      console.warn('[ModalEventBus] Handler not registered');
    }
  }
}

export const Modal = new ModalEventBus();
