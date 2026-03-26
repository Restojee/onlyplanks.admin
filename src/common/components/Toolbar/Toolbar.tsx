import React from 'react';
import clsx from 'clsx';
import {Column, Row} from '@common/components/Layout';
import { ToolbarProps, ToolbarElement } from './types';
import styles from './Toolbar.module.scss';
import { ButtonIcon } from '@ui/ButtonIcon';
import {Divider} from "@ui/Divider";

const Toolbar: React.FC<ToolbarProps> = ({ items, className }) => {
  const leftItems = items.filter((item) => item.align !== 'right');
  const rightItems = items.filter((item) => item.align === 'right');

  const renderItem = React.useCallback(
    (element: ToolbarElement)=> {

      if (element?.type === 'divider') {
        return (
          <Divider orientation="vertical" />
        )
      }

      return (
        element.component ?? (
          <ButtonIcon
            key={element.id}
            icon={element.icon}
            className={clsx([
              styles.iconButton,
              element.isActive && styles.active
            ])}
            disabled={element.disabled}
            onClick={element.disabled ? undefined : element.onClick}
            size="md"
            outlined
          />
        )
      )
    }, []);

  return (
    <Row 
      className={clsx(styles.toolbar, className)} 
      px="sm" 
      py="xs"
      align="center" 
      justify="between"
    >
      <Row align="center" justify="start">
        {leftItems.map(renderItem)}
      </Row>
      {rightItems.length > 0 && (
        <Row align="center" justify="end">
          {rightItems.map(renderItem)}
        </Row>
      )}
    </Row>
  );
};

export default React.memo(Toolbar);
