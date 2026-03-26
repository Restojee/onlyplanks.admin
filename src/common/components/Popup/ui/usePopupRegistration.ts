import { useEffect, useId } from 'react';
import { usePopupContext } from './PopupContext';





 
export const usePopupRegistration = (
  popupRef: React.RefObject<HTMLElement>,
  isVisible: boolean
) => {
  const popupId = useId();
  const popupContext = usePopupContext();

  useEffect(() => {
    if (isVisible && popupContext) {
      popupContext.registerPopup(popupId, popupRef);
      return () => {
        popupContext.unregisterPopup(popupId);
      };
    }
  }, [isVisible, popupId, popupContext, popupRef]);

  return popupContext;
};
