import { Typography } from "@ui/Typography";
import { TextTags } from "@common/constants/textTags";
import * as React from "react";

import "./Link.scss"
import withView from "@common/hocs/withView/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { LinkProps } from "@ui/Link/ui/types";
import LinkViewModel from "@ui/Link/ui/Link.model";

type LinkViewComponent = React.FC<WithViewProps<LinkViewModel, LinkProps>>;
const Link: LinkViewComponent= ({ viewModel, ...props }) => (
  <Typography
    tag={TextTags.A}
    onClick={viewModel.push}
    href={viewModel.props.linkUrl}
    className={viewModel.props.classPrx}
    {...props}
  />
)

export default withView(Link, LinkViewModel);
