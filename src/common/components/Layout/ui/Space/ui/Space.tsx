import * as React from 'react';
import { Flex, SpaceProps } from "@ui/Layout";

const Space = (props: SpaceProps) => {
  const { children, direction = 'row' } = props;

  return (
    <Flex direction={direction}>
      {children}
    </Flex>
  );
};

export default React.memo(Space);
