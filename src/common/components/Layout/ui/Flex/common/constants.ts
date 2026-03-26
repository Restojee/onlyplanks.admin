import { ThemeSizes } from "@common/themes/common/types";

const gapByThemeSize: Record<ThemeSizes, string> = {
  xs: 'gap-xs',
  md: 'gap-md',
  sm: 'gap-sm',
  lg: 'gap-lg',
  xl: 'gap-xl',
}
const justifyByType: Record<string, string> = {
  center: 'jc-center',
  start: 'jc-start',
  end: 'jc-end',
  between: 'jc-between',
  around: 'jc-around',
}
const directionByType: Record<string, string> = {
  row: 'row',
  column: 'column',
}
const alignByType: Record<string, string> = {
  center: 'align-center',
  end: 'align-end',
  start: 'align-start',
}

export const flexClasses = {
  root: 'UiFlex',
  justify: justifyByType,
  align: alignByType,
  direction: directionByType,
  gap: gapByThemeSize
} as const;
