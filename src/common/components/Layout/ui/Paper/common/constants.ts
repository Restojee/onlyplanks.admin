import { ThemeSizes } from "@common/themes/common/types";

export const paperPrx = 'UiPaper';


const paperFlexRadius: Partial<Record<ThemeSizes, string>> = {
  sm: 'borderRadiusSm',
  md: 'borderRadiusMd',
  lg: 'borderRadiusLg',
}


const specialRadiusClasses = {
  none: 'borderRadiusNone'
};

export const paperFlexClasses = {
  root: paperPrx,
  ...paperFlexRadius,
  ...specialRadiusClasses
}


export const paperRadiusClassBySizeMap: Partial<Record<ThemeSizes | 'none', string>> = {
  lg: paperFlexClasses.lg,
  md: paperFlexClasses.md,
  sm: paperFlexClasses.sm,
  none: paperFlexClasses.none
}
