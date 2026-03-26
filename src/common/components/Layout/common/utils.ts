import { ThemeColorKey } from '@common/themes/common/types';

export const toVar = (token: string, strict = true): string => {
  if (!token) return '';

  if (strict && (
    token.startsWith('var(') ||
    token.startsWith('#') ||
    token.startsWith('rgb') ||
    token.includes('px') ||
    token.includes('%')
  )) {
    return token;
  }

  return `var(--${token})`;
};

export const getTokenClass = (token?: string): string => {
  if (!token) return undefined;
  return token;
};


export const createTokenClasses = (
  tokens: Record<string, string>
): string[] => {
  return Object.entries(tokens)
    .filter(([_, value]) => value !== undefined)
    .map(([_, value]) => value as string);
};

export const setCssProperty = (
  property: string, 
  value?: string | ThemeColorKey
): Record<string, string> => {
  if (!value) return {};
  
  return { [property]: toVar(value) };
};

export const createStyles = (
  styles: Record<string, string | ThemeColorKey>
): Record<string, string> => {
  return Object.entries(styles).reduce((result, [property, value]) => {
    if (!value) return result;
    return { ...result, ...setCssProperty(property, value) };
  }, {});
}; 
