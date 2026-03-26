import { Flex, type FlexProps } from '@ui/Layout';
import cn from 'clsx';
import React from 'react';
import styles from './Spacer.module.scss';

const SpacerStyles = {
  column: styles.column,
  row: styles.row,
};

interface SpaceProps extends FlexProps {}
export const Spacer: React.FC<SpaceProps> = (props) => {
  const { 
    className, 
    children,
    justify,
    align,
    direction = 'column',
    wrap = 'wrap',
    ...otherProps
  } = props;

  const flexStyles = cn([SpacerStyles[direction], className]);

  return (
    <Flex 
      className={flexStyles} 
      wrap={wrap} 
      align={align ?? 'center'} 
      justify={justify ?? 'center'} 
      {...otherProps}
    >
      {children}
    </Flex>
  );
};
