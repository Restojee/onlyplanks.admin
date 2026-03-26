import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeSizes } from '@common/themes/common/types';
import { Typography } from '@ui/Typography';
import { Icon } from '@common/components/Icon';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: ThemeSizes;
  className?: string;
  hoverIcon?: string;
  onClick?: () => void;
  tooltip?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  className,
  hoverIcon,
  onClick,
  tooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getInitial = () => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div 
      className={clsx(styles.avatar, styles[size], className, {
        [styles.hoverable]: !!hoverIcon,
        [styles.clickable]: !!onClick,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      title={tooltip}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          {name && !isHovered && (
            <Typography size="md" className={styles.initial} color="paletteTextNormal">
              {getInitial()}
            </Typography>
          )}
        </div>
      )}
      {hoverIcon && isHovered && (
        <div className={styles.overlay}>
          <Icon icon={hoverIcon} size="sm" variant="secondary" noHover />
        </div>
      )}
    </div>
  );
};
