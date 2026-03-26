import * as React from 'react';
import Float from './Float';
import { StickyProps } from './types';

const Sticky: React.FC<StickyProps> = (props) => {
  return <Float {...props} position="sticky" />;
};

export default Sticky; 