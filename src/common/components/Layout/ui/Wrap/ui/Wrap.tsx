import { Flex, FlexProps } from '@ui/Layout';

type WrapProps = Pick<FlexProps, "direction" | "className" | "children">;
export const Wrap = (props: WrapProps) => {
  return <Flex {...props} />
};
