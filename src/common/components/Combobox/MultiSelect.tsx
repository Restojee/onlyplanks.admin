import React from 'react';
import { BaseSelect } from './BaseSelect';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';

interface MultiSelectProps {
  options: ListItemOptions[];
  onChange?: (selectedValues: any[]) => void;
  placeholder?: string;
  size?: ThemeSizes;
  value?: any[];
  disabled?: boolean;
  append?: React.ReactNode;
  title?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder = 'Выберите...',
  size = 'md',
  value = [],
  disabled = false,
  append,
  title,
}) => {

  const getDisplayText = () => {
    if (value.length === 0) return '';
    if (value.length === 1) {
      const selectedOption = options.find(opt => opt.value === value[0]);
      return typeof selectedOption?.label === 'string' ? selectedOption.label : value[0];
    }
    return `Выбрано ${value.length} элементов`;
  };

  const handleOptionChange = (option: ListItemOptions) => {
    const newValue = value.includes(option.value)
      ? value.filter(v => v !== option.value)
      : [...value, option.value];
    onChange?.(newValue);
  };


  const enrichedOptions = options.map(opt => ({
    ...opt,
    isSelected: value.includes(opt.value)
  }));

  return (
    <BaseSelect
      options={options}
      onChange={handleOptionChange}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      displayValue={getDisplayText()}
      enrichedOptions={enrichedOptions}
      showCheckbox={true}
      append={append}
      title={title}
    />
  );
};
