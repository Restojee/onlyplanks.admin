import { IconProps } from '@ui/Icon/common/types';
import * as React from "react";
import { Suspense } from "react";
import clsx from 'clsx';
import styles from './Icon.module.scss';

export type IconComponent = React.FC<IconProps>;
export const Icon: IconComponent = React.memo(
  (props) => {
    const { 
      icon, 
      variant = 'primary',
      active = false,
      disabled = false,
      size = 'md',
      color,
      noHover = false,
      className,
      ...rest
    } = props;

    const [hasError, setHasError] = React.useState(false);

    const LazyIcon: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>> = React.lazy(() =>
      import(`/src/resources/icons/${icon}.svg`)
        .then((module) => ({
          default: module.ReactComponent,
        }))
        .catch(() => {
          setHasError(true);
          return { default: () => null };
        })
    );

    const iconClassName = clsx(
      styles.icon,
      styles[size],
      color,
      {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
        [styles.active]: active,
        [styles.disabled]: disabled,
        [styles.noHover]: noHover,
      },
    );

    if (hasError) {
      return null;
    }
    return (
      <Suspense fallback={null}>
        <LazyIcon className={iconClassName} color={color} {...rest}  />
      </Suspense>
    );
  }
)
