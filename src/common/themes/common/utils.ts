

import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/common/types";
import { ThemeResultsByBySize, ThemeSizes } from "@common/themes/common/types";

export const getPaddingStyles = (
  themeLayoutSpaceMap: ThemeResultsByBySize,
  propMap: ThemePaddingSizesMap
): string => {
  let top: string;
  let bottom: string;
  let left: string;
  let right: string;

  if (!Object.values(propMap).filter(Boolean).length) {
    return undefined;
  }

  const mapping: Record<string, (value: string) => void> = {
    pa: v => (top = bottom = left = right = v),
    px: v => (left = right = v),
    py: v => (top = bottom = v),
    pr: v => (right = v),
    pl: v => (left = v),
    pb: v => (bottom = v),
    pt: v => (top = v),
  };

  Object.entries(propMap).forEach(([key, size]) => {
    const sizePx = themeLayoutSpaceMap[size];
    if (sizePx && mapping[key]) {
      mapping[key](sizePx);
    }
  });

  return [top, right, bottom, left].map(v => v ?? '0').join(' ');
}

export const getPercent = (number: number): string => `${number * 100}%`;
export const getPx = (number: number): string => `${number}px`;
export const calcSize = (size: number | string): string =>
  (typeof size === 'number') ? size <= 1 ? getPercent(size) : getPx(size) : size
export const getBorderRadius =
  (themeBorderRadiusMap: Partial<ThemeResultsByBySize>, size: ThemeSizes) => themeBorderRadiusMap[size];

type Styles = Record<string, string>;

export interface AutoClassOptions {
  

 
  props: Record<string, any>;

  



 
  bindings: (string | [string, Record<string, string>])[];

  

 
  root?: string;

  

 
  styles?: Styles;
}

export const getAutoClasses = ({ props, bindings, root, styles }: AutoClassOptions): string => {
  const classes = bindings.flatMap(binding => {
    if (typeof binding === 'string') {
      return props[binding] ? styles?.[binding] || binding : [];
    } else {
      const [prop, mapping] = binding;
      const value = props[prop];
      return value && typeof value === 'string' && mapping[value]
        ? styles?.[mapping[value]] || mapping[value]
        : [];
    }
  });

  return [root, ...classes].filter(Boolean).join(' ');
};
