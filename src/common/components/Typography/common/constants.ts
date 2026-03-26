import { ThemeResultsByBySize } from "@common/themes/common/types";

export const classByThemeSize: ThemeResultsByBySize = {
  xs: 'fontSizeXs',
  sm: 'fontSizeSm',
  md: 'fontSizeMd',
  lg: 'fontSizeLg',
  xl: 'fontSizeXl',
}

export const classByFontWeight: { [key: string]: string } = {
  light: 'fontWeightLight',
  normal: 'fontWeightNormal',
  medium: 'fontWeightMedium',
  semiBold: 'fontWeightSemiBold',
  bold: 'fontWeightBold',
}

export const rootClass = 'UiTypography';
