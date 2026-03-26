import React from 'react';
import { FlexProps, Spacer } from '@ui/Layout';

export interface CenterProps extends Omit<FlexProps, "align" | "justify"> {}

const Center: React.FC<CenterProps> = (props) => {
  const {
    direction = 'row',
    children,
    className,
    ...otherProps
  } = props;

  return (
    <Spacer
      className={className}
      direction={direction}
      width={1}
      {...otherProps}
      align="center"
      justify="center"
    >
      {children}
    </Spacer>
  );
};

export default React.memo(Center);
