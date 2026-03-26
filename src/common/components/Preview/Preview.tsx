import React, { useState } from 'react';
import { Popup } from '@ui/Popup';
import styles from './Preview.module.scss';

interface PreviewProps {
  text: string;
  image: string;
  width?: number;
  height?: number;
}

export const Preview: React.FC<PreviewProps> = ({ text, image, width = 450, height }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Popup
      isVisible={isOpen}
      onClose={handleClose}
      anchor={
        <span className={styles.anchor} onClick={handleOpen}>
          {text}
        </span>
      }
      width={width}
      height={height}
    >
      <div className={styles.previewContent}>
        <img src={image} alt={text} className={styles.image} />
      </div>
    </Popup>
  );
};
