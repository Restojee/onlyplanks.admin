import { FlexProps } from "@ui/Layout";

export type Orientation = 'vertical' | 'horizontal';
export interface StackProps extends Pick<FlexProps, 'children' | 'className' | 'gap' | 'height' | 'width'> {
  orientation?: Orientation;
}
export type FlexPropsByOrientationMapping = Record<
  Orientation,
  Pick<FlexProps, | "direction" | "justify" | 'align' | 'width' | 'height'>
>;
