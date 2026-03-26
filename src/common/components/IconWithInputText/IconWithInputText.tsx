import React, { useState, useRef, useEffect } from 'react';
import { InputText } from '@common/components/Input/ui/InputText/InputText';
import styles from './IconWithInputText.module.scss';
import { ThemeSizes } from '@common/themes/common/types';
import { ButtonIcon } from '@ui/ButtonIcon';
import useDebounce from '@common/hooks/useDebounce';

interface IconWithInputTextProps {
  icon: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  tooltip?: string;
  size?: ThemeSizes;
  debounceDelay?: number;
}

export const IconWithInputText: React.FC<IconWithInputTextProps> = ({
  icon,
  placeholder = '',
  value = '',
  onChange,
  onSubmit,
  tooltip,
  size,
  debounceDelay,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLDivElement>(null);
  
  const debouncedOnChange = useDebounce((newValue: string) => {
    onChange?.(newValue);
    onSubmit?.(newValue);
  }, debounceDelay || 0);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      const input = inputRef.current.querySelector('input');
      input?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (debounceDelay) {
      debouncedOnChange(newValue);
    } else {
      onChange?.(newValue);
      onSubmit?.(newValue);
    }
  };

  return (
    <div className={styles.container} ref={inputRef} title={tooltip}>
      {!isExpanded ? (
        <ButtonIcon
          className={styles.iconButton}
          onClick={handleIconClick}
          icon={icon}
          size="sm"
          outlined
        />
      ) : (
        <div className={styles.inputWrapper}>
          <InputText
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            size={size}
            noBorder
            noHover
            noPadding
            integrated
          />
        </div>
      )}
    </div>
  );
};
