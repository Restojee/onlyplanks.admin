import { Flex, } from '@ui/Layout';
import * as React from 'react';
import { StackProps } from '@ui/Layout/ui/Stack/common/types';
import { flexPropsByOrientationMapping } from '@ui/Layout/ui/Stack/common/constants';
import './Stack.scss'
const Stack = React.forwardRef<HTMLElement, StackProps>(
  (props, ref) => <Flex ref={ref} {...flexPropsByOrientationMapping[props.orientation]} {...props} />
)
export default React.memo(Stack);
