import React from 'react';
import { FlexProps } from "@ui/Layout";
import { Stack } from "@ui/Layout/ui/Stack";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";

import "./Column.scss"
import { rootClass } from "@ui/Layout/ui/Column/common/constants";

export interface ColumnProps extends FlexProps {

}

const Column = React.forwardRef<HTMLElement, WithAutoClassProps<ColumnProps>>(
  (props, ref) => <Stack ref={ref} className={props.autoClasses} width={1} orientation="vertical" {...props} />
);

export default withAutoClasses(Column, { bindings: ['nonIntegrated'], root: rootClass });
