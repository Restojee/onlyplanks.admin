import React, { useState } from 'react';
import { Combobox } from './Combobox';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import List from '@ui/List/ui/Base/List';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { PopupPosition } from '@ui/Popup';

interface BaseSelectProps {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  placeholder?: string;
  size?: ThemeSizes;
  disabled?: boolean;
  displayValue: string;
  enrichedOptions?: ListItemOptions[];
  showCheckbox?: boolean;
  onInputChange?: (value: string) => void;
  nonIntegration?: boolean;
  integrated?: boolean;
  rightIcon?: string;
  append?: React.ReactNode;
  leftIcon?: string;
  title?: string;
  disableFilter?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  options,
  onChange,
  placeholder = 'Выберите...',
  size = 'md',
  disabled = false,
  displayValue,
  enrichedOptions,
  showCheckbox = false,
  onInputChange,
  nonIntegration = false,
  integrated = false,
  rightIcon,
  append,
  leftIcon,
  title,
  disableFilter = false,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = (next: boolean) => {
    if (controlledIsOpen === undefined) {
      setUncontrolledIsOpen(next);
    }
    onOpenChange?.(next);
  }

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchValue('');
  };

  const handleOptionChange = (option: ListItemOptions) => {
    onChange?.(option);
    if (!showCheckbox) {
      setSearchValue('');
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disableFilter) return;
    const value = e.target.value;
    setSearchValue(value);
    setIsOpen(true);
    onInputChange?.(value);
  };

  const filteredOptions = (disableFilter || !searchValue)
    ? options
    : options.filter(opt => {
        const label = typeof opt.label === 'string' ? opt.label : '';
        return label.toLowerCase().includes(searchValue.toLowerCase());
      });

  const optionsToShow = enrichedOptions 
    ? ((disableFilter || !searchValue)
        ? enrichedOptions
        : enrichedOptions.filter(opt => {
            const label = typeof opt.label === 'string' ? opt.label : '';
            return label.toLowerCase().includes(searchValue.toLowerCase());
          }))
    : filteredOptions;

  return (
    <Combobox
      trigger={
        <InputText
          onClick={handleInputClick}
          value={searchValue || displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          size={size}
          nonIntegration={nonIntegration}
          integrated={integrated}
          rightIcon={rightIcon}
          append={append}
          leftIcon={leftIcon}
          readOnly={true}
          noHover={false}
        />
      }
      content={
        <List
          options={optionsToShow}
          onChange={handleOptionChange}
          size={size}
          showCheckbox={showCheckbox}
          showSearch={true}
        />
      }
      isOpen={isOpen}
      onClose={handleClose}
      position={PopupPosition.BOTTOM}
      size={size}
    />
  );
};
