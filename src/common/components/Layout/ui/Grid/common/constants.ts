import { ThemeSizes } from "@common/themes/common/types";

export const gridPrx = 'UiGrid';


export const gapClassBySize: Record<ThemeSizes, string> = {
  'xs': 'gapXs',
  'sm': 'gapSm',
  'md': 'gapMd',
  'lg': 'gapLg',
  'xl': 'gapXl',
};


export const columnGapClassBySize: Record<ThemeSizes, string> = {
  'xs': 'columnGapXs',
  'sm': 'columnGapSm',
  'md': 'columnGapMd',
  'lg': 'columnGapLg',
  'xl': 'columnGapXl',
};


export const rowGapClassBySize: Record<ThemeSizes, string> = {
  'xs': 'rowGapXs',
  'sm': 'rowGapSm',
  'md': 'rowGapMd',
  'lg': 'rowGapLg',
  'xl': 'rowGapXl',
};


export const minColumnWidthClassBySize: Record<string, string> = {
  '120': 'minColumnWidth120',
  '200': 'minColumnWidth200',
  '250': 'minColumnWidth250',
  '300': 'minColumnWidth300',
  '400': 'minColumnWidth400',
};


export const widthClassBySize: Record<string, string> = {
  '100': 'width100',
  '100%': 'width100',
};


export const columnsClassByCount: Record<string, string> = {
  1: 'columns1',
  2: 'columns2',
  '3': 'columns3',
  '4': 'columns4',
  '5': 'columns5',
  '6': 'columns6',
};


export const rowsClassByCount: Record<string, string> = {
  '1': 'rows1',
  '2': 'rows2',
  '3': 'rows3',
  '4': 'rows4',
  '5': 'rows5',
}; 