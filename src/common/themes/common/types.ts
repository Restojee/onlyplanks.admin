import defaultTheme from '@/resources/theme.json';
import { ThemeTokens } from "@common/themes/common/variables";

export type Palette = typeof defaultTheme.palette;
export type ColorKey = keyof Palette["colors"];
export type WithColors<T = {}> = T & Palette["colors"];
export type TextColorKey = keyof WithColors<Palette["text"]>;



export type ThemeColorKey = ThemeTokens;

export type ThemeColors =
  | Palette["text"]
  | Palette["icon"]
  | Palette["line"]
  | Palette["border"]

export type ThemeSizes = "xs" | "sm" | "md" | "lg" | "xl"

export type ThemeResultsByBySize<Val = string> = Partial<Record<ThemeSizes, Val>>

export type ThemeSizeValue = string | number;
