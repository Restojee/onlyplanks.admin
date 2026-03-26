import * as React from 'react';
import Float from './Float';
import { FixedProps } from './types';

const Fixed: React.FC<FixedProps> = (props) => {
  return <Float {...props} position="fixed" />;
};

export default Fixed; 