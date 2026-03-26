import React from 'react';
import { BaseSelect } from './BaseSelect';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import IconChevronDown from '@/resources/icons/IconChevronDown.svg';
import { ButtonIcon } from '@ui/ButtonIcon';
import { Row } from '@ui/Layout';

interface SelectProps {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  placeholder?: string;
  size?: ThemeSizes;
  value?: any;
  disabled?: boolean;
  nonIntegration?: boolean;
  integrated?: boolean;
  append?: React.ReactNode;
  leftIcon?: string;
  disableFilter?: boolean;
  allowClear?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  placeholder = 'Выберите...',
  size = 'md',
  value,
  disabled = false,
  nonIntegration = false,
  integrated = false,
  append,
  leftIcon,
  disableFilter = false,
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = typeof selectedOption?.label === 'string' ? selectedOption.label : '';

  const enrichedOptions: ListItemOptions[] = React.useMemo(() => {
    const base = options.map((opt) => ({
      ...opt,
      isSelected: opt.value === value,
    }));

    if (!allowClear) {
      return base;
    }

    return [
      { label: 'Не выбрано', value: undefined, isSelected: value === undefined },
      ...base,
    ];
  }, [options, value, allowClear]);

  const showClear = allowClear && !disabled && value;

  const handleClear = React.useCallback(() => {
    onChange?.({ label: 'Не выбрано', value: undefined });
  }, [onChange]);

  const handleToggleOpen = React.useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleIconMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleClearMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleClear();
  }, [handleClear]);

  const rightNode = React.useMemo(() => {
    if (append) {
      return append;
    }

    return (
      <Row gap="xs" align="center">
        {showClear && (
          <ButtonIcon
            icon="IconReject"
            size={size}
            onClick={handleClear}
          />
        )}
        <ButtonIcon
          icon="IconChevronDown"
          size={size}
          onClick={handleToggleOpen}
        />
      </Row>
    );
  }, [append, showClear, handleClear, handleClearMouseDown, handleIconMouseDown, handleToggleOpen, size]);

  const rightIcon = append ? undefined : undefined;

  return (
    <BaseSelect
      options={options}
      enrichedOptions={enrichedOptions}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      displayValue={displayValue}
      showCheckbox={false}
      nonIntegration={nonIntegration}
      integrated={integrated}
      rightIcon={rightIcon}
      append={rightNode}
      leftIcon={leftIcon}
      disableFilter={disableFilter}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
};
