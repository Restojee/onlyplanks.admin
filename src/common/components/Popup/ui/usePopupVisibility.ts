import { useState, useEffect, useCallback } from 'react';
import { PositionStyles } from './popupUtils';

export const usePopupVisibility = (
  isVisible: boolean,
  getPopupPosition: () => PositionStyles ,
  anchorRef: React.RefObject<HTMLElement>,
  popupRef: React.RefObject<HTMLElement>
) => {
  const [popupPositionStyles, setPopupPositionStyles] = useState<PositionStyles >(null);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const updatePosition = useCallback(() => {
    setPopupPositionStyles(getPopupPosition());
  }, [getPopupPosition]);

  
  useEffect(() => {
    if (isVisible && anchorRef.current && popupRef.current) {
      updatePosition();
    } else if (!isVisible) {
      
      setIsRendered(false);
      setPopupPositionStyles(null);
    }
  }, [isVisible, anchorRef, popupRef, updatePosition]);

  
  useEffect(() => {
    if (!isVisible || !popupRef.current || !anchorRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      
      updatePosition();
    });

    
    resizeObserver.observe(popupRef.current);
    
    
    const anchorElement = anchorRef.current.firstElementChild as HTMLElement;
    if (anchorElement) {
      resizeObserver.observe(anchorElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isVisible, popupRef, anchorRef, updatePosition]);

  
  useEffect(() => {
    if (popupPositionStyles) {
      setIsRendered(true);
    }
  }, [popupPositionStyles]);

  return {
    popupPositionStyles,
    isRendered,
    updatePosition
  };
};
