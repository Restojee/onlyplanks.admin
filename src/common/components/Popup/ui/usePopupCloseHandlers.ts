import { RefObject } from 'react';
import { useOutsideClick } from '@ui/Popup';

interface UsePopupCloseHandlersOptions {
  refs: RefObject<HTMLElement>[];
  onClose?: () => void;
  isVisible: boolean;
  closeOnScroll?: boolean;
  checkAdditionalElements?: (target: Node) => boolean;
}

export const usePopupCloseHandlers = ({
  refs,
  onClose,
  isVisible,
  closeOnScroll,
  checkAdditionalElements
}: UsePopupCloseHandlersOptions) => {
  useOutsideClick(refs, onClose, isVisible, checkAdditionalElements);
};
