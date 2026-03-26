import type * as React from 'react';

export type EventHandler<T = any, E = HTMLElement> = (
  additional: T,
  event: React.MouseEvent<E>,
) => void;
