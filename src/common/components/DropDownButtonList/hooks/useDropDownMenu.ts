import { useState, useCallback, useMemo } from 'react';
import { type ListItemOptions } from '@ui/Select/common/types';

interface UseDropDownMenuProps {
  disabled?: boolean;
  showCheckbox?: boolean;
  onChange?: (option: ListItemOptions) => void;
}

export const useDropDownMenu = ({ disabled, showCheckbox, onChange }: UseDropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOptionChange = useCallback((option: ListItemOptions) => {
    onChange?.(option);
    if (!showCheckbox) {
      setIsOpen(false);
    }
  }, [onChange, showCheckbox]);

  return {
    isOpen,
    handleButtonClick,
    handleClose,
    handleOptionChange,
  };
};
