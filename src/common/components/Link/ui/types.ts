import { TypographyProps } from "@ui/Typography/common/types";
import { PropsWithChildren } from "react";
import { UrlBuilder } from "@common/services/router";

export interface LinkProps extends TypographyProps, PropsWithChildren {
  to: UrlBuilder;
}
