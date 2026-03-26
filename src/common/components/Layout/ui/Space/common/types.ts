import React from 'react';
import { FlexProps } from "@ui/Layout";

export interface SpaceProps extends Pick<FlexProps, 'direction'>{
  children?: React.ReactNode;
}
