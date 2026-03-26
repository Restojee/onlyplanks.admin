import * as React from 'react';
import cn from 'clsx';
import { FloatProps, Value } from './types';
import useAppTheme from "@common/hooks/useAppTheme";
import './Float.scss';

const Float: React.FC<FloatProps> = ({
  children,
  className,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  background,
  borderRadius,
  boxShadow,
  overflow = 'visible',
  centered,
}) => {
  const theme = useAppTheme();

  const formatValue = (value?: Value): string => {
    if (value === undefined) return undefined;
    return theme.getCalculatedSize(value);
  };

  const shouldCenterX = centered || left === '50%';
  const shouldCenterY = centered && top === '50%';

  let transform = '';
  if (shouldCenterX && shouldCenterY) {
    transform = 'translate(-50%, -50%)';
  } else if (shouldCenterX) {
    transform = 'translateX(-50%)';
  } else if (shouldCenterY) {
    transform = 'translateY(-50%)';
  }

  const styles: React.CSSProperties = {
    position,
    top: formatValue(top),
    right: formatValue(right),
    bottom: formatValue(bottom),
    left: formatValue(left),
    zIndex,
    width: formatValue(width),
    height: formatValue(height),
    maxWidth: formatValue(maxWidth),
    maxHeight: formatValue(maxHeight),
    minWidth: formatValue(minWidth),
    minHeight: formatValue(minHeight),
    background,
    borderRadius,
    boxShadow,
    overflow,
    transform,
  };

  return (
    <div className={cn('Float', className)} style={styles}>
      {children}
    </div>
  );
};

export default Float; 