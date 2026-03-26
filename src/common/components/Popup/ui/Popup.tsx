import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.scss';
import { Column, Row } from "@ui/Layout";
import { ThemeSizes } from '@common/themes/common/types';
import clsx from "clsx";
import {
  PopupPosition,
  AnchorAlign,
  type BoundaryOptions,
} from './usePopupPosition';
import { usePopup } from '@ui/Popup';
import { When } from '@ui/If';

interface PopupProps {
  header?: React.ReactElement;
  children: React.ReactElement;
  footer?: React.ReactElement;
  width?: number;
  height?: number;
  isVisible?: boolean;
  className?: string;
  onClose?: () => void;
  position?: PopupPosition | keyof typeof PopupPosition;
  anchor: React.ReactElement;
  closeOnScroll?: boolean;
  offset?: number;
  needOffset?: boolean;
  anchorAlign?: AnchorAlign;
  boundary?: BoundaryOptions;
  noPadding?: boolean;
  nonIntegration?: boolean;
  size?: ThemeSizes;
}

const defaultPosition = { left: 0, top: 0 };

export const Popup: React.FC<PopupProps> = (props) => {
  const { 
    header, 
    children,
    width,
    height,
    footer, 
    className, 
    isVisible,
    position = PopupPosition.BOTTOM,
    anchor,
    onClose,
    closeOnScroll,
    offset,
    anchorAlign = AnchorAlign.CENTER,
    boundary,
    noPadding,
    size = 'md',
  } = props;

   const { anchorRef, popupRef, popupPositionStyles, isRendered } = usePopup({
    isVisible,
    onClose,
    closeOnScroll,
    position,
    offset,
    boundary,
    anchorAlign
  });

  const popupClasses = clsx(
    styles.Popup,
    size && styles[size],
    className,
    isRendered && styles.visible,
  );

  const style: React.CSSProperties = {
    width,
    height,
    ...defaultPosition,
    ...popupPositionStyles,
    opacity: isRendered ? 1 : 0,
  };

  return (
    <div className={styles.Wrapper}>
      <div 
        ref={anchorRef}
        style={{
          display: 'contents'
        }}
      >
        {anchor}
      </div>
      <When condition={isVisible}>{
        ReactDOM.createPortal(
          <Column
            ref={popupRef}
            className={popupClasses}
            style={style}
            data-popup-content="true"
          >
            <Column {...!noPadding && {pa: size === 'sm' ? 'sm' : 'md'}}>
              {header && <Row className={clsx(styles.Header, size && styles[`Header_${size}`])}>{header}</Row>}

              <Column className={styles.Body}>
                {children}
              </Column>

              {footer && <Row className={clsx(styles.Footer, size && styles[`Footer_${size}`])}>{footer}</Row>}
            </Column>
          </Column>
        ,
        document.body
      )}
      </When>
    </div>
  );
};
