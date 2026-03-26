import { ThemeColorKey } from '@common/themes/common/types';





 
export const resolveThemeValue = (value?: ThemeColorKey | string): string => {
  if (!value) return undefined;
  
  
  if (value.startsWith('var(') || value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba')) {
    return value;
  }
  
  
  if (value.startsWith('palette')) {
    
    
    return `var(--${value})`;
  }
  
  
  return value;
};



 
export const isThemeToken = (value?: string): boolean => {
  return typeof value === 'string' && value.startsWith('palette');
}; 