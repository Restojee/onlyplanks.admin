import * as React from 'react';
import classNames from 'clsx';
import { ButtonProps } from "@ui/Button";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";
import { calcSize } from "@common/themes/common/utils";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";
import clsx from 'clsx';
import './CoreButton.scss';

const Component = 'button';

const renderIconOrContent = (icon?: string, content?: React.ReactNode, size?: string) => {
  if (icon) {
    return <Icon icon={icon} size="sm" variant="secondary" noHover />;
  }
  return content;
};

const CoreButtonComponent: React.FC<WithAutoClassProps<ButtonProps>> = (props) => {
  const {
    children,
    className,
    append,
    prepend,
    icon,
    label,
    type = 'button',
    variant,
    color,
    bgColor,
    border,
    borderColor,
    borderRadius,
    padding,
    fontSize,
    fontWeight,
    minWidth,
    maxWidth,
    width,
    height,
    hoverBorderColor,
    hoverBgColor,
    hoverColor,
    activeBorderColor,
    activeBgColor,
    activeColor,
    isActive,
    noBg,
    size = 'md',
    autoClasses,
    ...otherProps
  } = props;

  
  const inlineStyles = {
    padding,
    fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    minWidth: calcSize(minWidth),
    maxWidth: calcSize(maxWidth),
    width: calcSize(width),
    height: calcSize(height),
  };

  
  const tokenClasses = !variant ? clsx([
    color,
    borderColor,
    
    isActive && activeBorderColor,
    isActive ? activeBgColor : bgColor,
    isActive && activeColor,
    
    !isActive && hoverBorderColor,
    !isActive && !noBg && hoverBgColor,
    !isActive && hoverColor,
  ]) : '';

  
  const variantClass = variant ? `variant-${variant}` : '';

  const renderLeft = React.useMemo(
    () => (prepend || icon) && renderIconOrContent(icon, prepend, size),
    [prepend, icon, size],
  );

  return (
    <Component
      className={classNames(
        autoClasses,
        variantClass,
        tokenClasses,
        className,
      )}
      style={inlineStyles}
      {...otherProps}
    >
      {renderLeft}
      {children || label}
      {append}
    </Component>
  );
};

const fontWeightMapping = {
  'light': 'fontWeightLight',
  'normal': 'fontWeightNormal',
  'medium': 'fontWeightMedium',
  'semiBold': 'fontWeightSemiBold',
  'bold': 'fontWeightBold',
};

const borderMapping = {
  'thin': 'borderThinNormal',
  'normal': 'borderNormalNormal',
  'thick': 'borderThickNormal',
};

const borderRadiusMapping = {
  'sm': 'borderRadiusSm',
  'md': 'borderRadiusMd',
  'lg': 'borderRadiusLg',
};

const sizeMapping = {
  'sm': 'sm',
  'md': 'md',
};

export const CoreButton = withAutoClasses(CoreButtonComponent, {
  bindings: [
    'isActive',
    'noBg',
    'noBorder',
    'noPadding',
    ['fontWeight', fontWeightMapping],
    ['border', borderMapping],
    ['borderRadius', borderRadiusMapping],
    ['size', sizeMapping],
  ],
  defaults: {
    size: 'md'
  },
  root: "UiCoreButton",
});
