import React, { PropsWithChildren } from 'react';
import { AnchorAlign, Popup, PopupPosition } from '@ui/Popup';
import { type ComboboxProps } from './types';
import clsx from 'clsx';
import styles from './Combobox.module.scss';
import { Column, Row } from '@ui/Layout';

export const Combobox: React.FC<PropsWithChildren<ComboboxProps>> = ({
  trigger,
  content,
  isOpen,
  onClose,
  position = PopupPosition.BOTTOM,
  size = 'md',
  noPadding = true,
  needOffset = true,
  className,
}) => {
  return (
    <Row className={styles.combobox}>
      <Popup
        isVisible={isOpen}
        onClose={onClose}
        anchor={trigger}
        position={position}
        noPadding={noPadding}
        needOffset={needOffset}
        anchorAlign={AnchorAlign.START}
      >
        <Column className={clsx(styles.comboboxContent, styles[size], className)}>
          {content}
        </Column>
      </Popup>
    </Row>
  );
};

export default Combobox;
