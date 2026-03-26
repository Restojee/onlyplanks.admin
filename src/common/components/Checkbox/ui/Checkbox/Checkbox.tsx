import React, { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';
import { ThemeSizes } from '@common/themes/common/types';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  indeterminate?: boolean;
  label?: string;
  error?: string;
  size?: ThemeSizes;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, label, error, size = 'md', ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checkboxRef]);

    const checkbox = (
      <input
        ref={checkboxRef}
        type="checkbox"
        className={clsx(styles.checkbox, className, {
          [styles.error]: error,
          [styles.sizeSm]: size === 'sm',
          [styles.sizeMd]: size === 'md',
        })}
        {...props}
      />
    );

    if (label) {
      return (
        <label className={styles.container}>
          {checkbox}
          <span className={styles.label}>{label}</span>
          {error && <span className={styles.errorText}>{error}</span>}
        </label>
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';
