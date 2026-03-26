import React, { PropsWithChildren } from "react";
import cn from "clsx";
import { paperFlexClasses, paperRadiusClassBySizeMap } from "@ui/Layout/ui/Paper/common/constants";
import { Flex } from "@ui/Layout";
import { PaperProps } from "@ui/Layout/ui/Paper/common/types";

import "./Paper.scss"

type PaperPropsWithChildren = PropsWithChildren<PaperProps>;
const Paper = React.forwardRef<HTMLElement, PaperPropsWithChildren>(
  (props, ref) => {
    const { bgColor, radius, className, color, nonIntegration,  ...flexProps } = props;
    const radiusClassBySize = paperRadiusClassBySizeMap[radius];
    const flexClasses = cn(
      bgColor,
      radiusClassBySize,
      paperFlexClasses.root,
      nonIntegration && 'nonIntegration',
      className,
    );

    return (
      <Flex ref={ref} {...flexProps} className={flexClasses}>
        { props.children }
      </Flex>
    );
  }
)

export default React.memo(Paper);
