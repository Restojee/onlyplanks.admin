import type * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  children?: React.ReactNode;
  isVisible?: boolean;
  container?: Element;
}
export const Portal = (props: Partial<Props>) => {
  const { container, children } = props;

  if (container) {
    return ReactDOM.createPortal(children, container);
  }

  return null;
};
