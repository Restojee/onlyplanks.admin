import * as React from 'react';
import clsx from 'clsx';
import { forwardRef, memo, PropsWithRef, RefObject } from 'react';
import styles from './Input.module.scss';
import { TextInputProps } from "@ui/Input";
import { Column, Paper, Row } from '@ui/Layout';
import { Icon } from '@ui/Icon';
import { ThemeSizes } from '@common/themes/common/types';

const renderIconOrContent = (icon?: string, content?: React.ReactNode, size?: ThemeSizes) => {
  if (icon) {
    return <Icon icon={icon} size={size} />;
  }
  return content;
};

export const InputText: React.FC<TextInputProps> = memo(forwardRef(
  (props, ref: React.RefObject<HTMLInputElement>) => {
    const {
      readOnly = false,
      disabled = false,
      onChange = () => {},
      append = null,
      value = '',
      onClick = () => {},
      prepend = null,
      className = '',
      placeholder = '',
      color,
      leftIcon,
      rightIcon,
      integrated = false,
      noBorder = false,
      noHover = false,
      size = 'md',
      type = 'text',
      onBlur,
      onFocus,
      nonIntegration,
      noPadding = false,
    } = props;

    const renderLeft = React.useMemo(
      () => (prepend || leftIcon) && (
        <div className={styles.Prepend}>
          {renderIconOrContent(leftIcon, prepend, size)}
        </div>
      ),
      [prepend, leftIcon, size],
    );

    const renderRight = React.useMemo(
      () => (append || rightIcon) && (
        <div className={styles.Append}>
          {renderIconOrContent(rightIcon, append, size)}
        </div>
      ),
      [append, rightIcon, size],
    );

    const inputProps = React.useMemo(
      () => ({
        className: styles.TextInput,
        value: value?.toString(),
        type,
        onClick,
        onChange,
        placeholder,
        readOnly,
        disabled,
      }),
      [readOnly, disabled, value, onClick, onChange, placeholder, type],
    );

    const wrapperClassName = clsx(
      className,
      styles.Wrapper,
      {
        [styles.integrated]: integrated,
        [styles.noBorder]: noBorder,
        [styles.noHover]: noHover,
        [styles.sizeSm]: size === 'sm',
        [styles.sizeMd]: size === 'md',
        [styles.nonIntegration]: nonIntegration,
        [styles.noPadding]: noPadding,
        [styles.disabled]: disabled,
      }
    );

    return (
      <div color={color} className={wrapperClassName}>
        {renderLeft}
        <input
          ref={ref}
          {...inputProps}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.TextInput}
        />
        {renderRight}
      </div>
    );
  }
));
