import React, { useState } from 'react';
import { Combobox } from './Combobox';
import { ButtonIcon } from '@common/components/ButtonIcon';
import List from '@ui/List/ui/Base/List';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { PopupPosition } from '@ui/Popup';

interface DropdownProps {
  icon: string;
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  tooltip?: string;
  disabled?: boolean;
  showCheckbox?: boolean;
  showSearch?: boolean;
  size?: ThemeSizes;
  value?: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  icon,
  options,
  onChange,
  tooltip,
  disabled = false,
  showCheckbox = false,
  showSearch = false,
  size = 'md',
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOptionChange = (option: ListItemOptions) => {
    onChange?.(option);
    if (!showCheckbox) {
      setIsOpen(false);
    }
  };

  return (
    <Combobox
      trigger={
        <ButtonIcon
          icon={icon}
          onClick={handleButtonClick}
          tooltip={tooltip}
          disabled={disabled}
          size={size}
        />
      }
      content={
        <List
          options={options}
          onChange={handleOptionChange}
          size={size}
          showCheckbox={showCheckbox}
          showSearch={showSearch}
        />
      }
      isOpen={isOpen}
      onClose={handleClose}
      position={PopupPosition.BOTTOM}
      size={size}
    />
  );
};
