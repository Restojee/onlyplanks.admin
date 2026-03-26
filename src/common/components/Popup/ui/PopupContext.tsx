import React, { createContext, useContext, useRef, useCallback } from 'react';

export interface PopupContextValue {
  registerPopup: (id: string, ref: React.RefObject<HTMLElement>) => void;
  unregisterPopup: (id: string) => void;
  isClickInsideAnyPopup: (target: Node) => boolean;
  registerCloseHandler: (id: string, closeHandler: () => void) => void;
  unregisterCloseHandler: (id: string) => void;
  closeOtherPopups: (exceptId: string) => void;
}

const PopupContext = createContext<PopupContextValue >(null);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const popupsRef = useRef<Map<string, React.RefObject<HTMLElement>>>(new Map());
  const closeHandlersRef = useRef<Map<string, () => void>>(new Map());

  const registerPopup = useCallback((id: string, ref: React.RefObject<HTMLElement>) => {
    popupsRef.current.set(id, ref);
  }, []);

  const unregisterPopup = useCallback((id: string) => {
    popupsRef.current.delete(id);
  }, []);

  const isClickInsideAnyPopup = useCallback((target: Node) => {
    for (const [, ref] of popupsRef.current.entries()) {
      if (ref.current?.contains(target)) {
        return true;
      }
    }
    return false;
  }, []);

  const registerCloseHandler = useCallback((id: string, closeHandler: () => void) => {
    closeHandlersRef.current.set(id, closeHandler);
  }, []);

  const unregisterCloseHandler = useCallback((id: string) => {
    closeHandlersRef.current.delete(id);
  }, []);

  const closeOtherPopups = useCallback((exceptId: string) => {
    closeHandlersRef.current.forEach((closeHandler, id) => {
      if (id !== exceptId) {
        closeHandler();
      }
    });
  }, []);

  return (
    <PopupContext.Provider 
      value={{ 
        registerPopup, 
        unregisterPopup, 
        isClickInsideAnyPopup,
        registerCloseHandler,
        unregisterCloseHandler,
        closeOtherPopups
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  return context;
};
