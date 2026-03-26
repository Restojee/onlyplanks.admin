import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Typography } from '@ui/Typography';
import { LinkProps } from '@ui/Link/ui/types';

import './Link.scss';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

export const RouterLink: React.FC<RouterLinkProps> = ({ 
  to, 
  className, 
  children,
  ...props 
}) => {
  return (
    <ReactRouterLink to={to} className={className} style={{ textDecoration: 'none' }}>
      <Typography {...props}>
        {children}
      </Typography>
    </ReactRouterLink>
  );
};

export default RouterLink;
