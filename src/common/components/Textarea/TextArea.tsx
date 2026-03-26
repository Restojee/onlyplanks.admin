import * as React from 'react';
import clsx from 'clsx';
import { forwardRef, memo } from 'react';
import styles from './TextArea.module.scss';
import { ThemeSizes } from '@common/themes/common/types';

export interface TextAreaProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  size?: ThemeSizes;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const TextArea: React.FC<TextAreaProps> = memo(forwardRef(
  (props, ref: React.RefObject<HTMLTextAreaElement>) => {
    const {
      value = '',
      onChange = () => {},
      placeholder = '',
      className = '',
      rows = 4,
      maxLength,
      disabled = false,
      readOnly = false,
      size = 'md',
      onBlur,
      onFocus,
    } = props;

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={onBlur}
        onFocus={onFocus}
        className={clsx(styles.textarea, className, {
          [styles.sizeSm]: size === 'sm',
          [styles.sizeMd]: size === 'md',
          [styles.sizeLg]: size === 'lg',
          [styles.disabled]: disabled,
        })}
      />
    );
  }
));

TextArea.displayName = 'TextArea';
