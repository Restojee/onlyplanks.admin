import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/common/types';
import { PropsWithChildren } from "react";
import useAppTheme from "@common/hooks/useAppTheme";
import { flexClasses } from "@ui/Layout/ui/Flex/common/constants";
import cn from "clsx";

import './Flex.scss';
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import LinkViewModel from "@ui/Link/ui/Link.model";
import { LinkProps } from "@ui/Link/ui/types";
import FlexViewModel from "@ui/Layout/ui/Flex/ui/FlexViewModel";

type FLexProps = WithAutoClassProps<FlexProps>;
const Flex = React.forwardRef<HTMLElement, FLexProps>(
  (props, ref) => {
    const {
      element = 'div',

      pa,
      px,
      py,
      pl,
      pr,
      pt,
      pb,

      width,
      minWidth,
      maxWidth,
      height,
      autoClasses,
      children,
      nonIntegration,

      style,

      onSubmit,
      onClick,
      onDrop,
      onDragEnd,
      onDragLeave,
      onDragOver,
      onDragStart,
    } = props;

    const theme = useAppTheme();
    const Element = element;

    const styles = {
      padding: theme.getPadding({ pa, px, py, pl, pr, pt, pb }),
      width: width && theme.getCalculatedSize(width),
      minWidth: minWidth && theme.getCalculatedSize(minWidth),
      maxWidth: maxWidth && theme.getCalculatedSize(maxWidth),
      height: height && theme.getCalculatedSize(height),
      ...style,
    };

    const handlers = {
      onSubmit,
      onClick,
      onDrop,
      onDragEnd,
      onDragLeave,
      onDragOver,
      onDragStart,
    };

    const flexClassNames = cn(autoClasses, nonIntegration && 'nonIntegration');

    return (
      <Element ref={ref} className={flexClassNames} style={styles} {...handlers}>
        {children}
      </Element>
    );
  }
);

export default withAutoClasses(Flex, {
    bindings: [
      'nonIntegration',
      ['gap', flexClasses.gap],
      ['align', flexClasses.align],
      ['direction', flexClasses.direction],
      ['justify', flexClasses.justify],
    ],
    defaults: {
      justify: 'start',
      align: 'start',
      direction: 'row',
    },
    root: flexClasses.root
  }
)
