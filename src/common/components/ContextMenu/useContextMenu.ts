import { useState, useCallback, useEffect } from 'react';

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}





















 
export const useContextMenu = () => {
  const [state, setState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const openContextMenu = useCallback((x: number, y: number) => {
    setState({ isOpen: true, x, y });
  }, []);

  const closeContextMenu = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      const handleClick = () => closeContextMenu();
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [state.isOpen, closeContextMenu]);

  return {
    isOpen: state.isOpen,
    x: state.x,
    y: state.y,
    openContextMenu,
    closeContextMenu,
  };
};
