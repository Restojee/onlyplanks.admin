import { Typography } from "@ui/Typography";
import * as React from "react";
import { SectionHeaderViewProps } from "@/modules/navigation/view/Section/types";

const SectionHeaderView = (props: SectionHeaderViewProps) => (
  <Typography
    fontSize="md"
    color="paletteTextDisabled"
    upperCase
    cantSelect
  >
    {props.title}
  </Typography>
)

export default SectionHeaderView;
