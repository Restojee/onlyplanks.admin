import { ValidationFunctions } from './ValidationFunctions';


export * from './types';
export { BaseValidationHandler } from './BaseValidationHandler';
export { ValidationFunctions } from './ValidationFunctions';

export * from './handlers';

export const required = (message?: string) => ValidationFunctions.required(message);
export const min = (minValue: number, message?: string) => ValidationFunctions.min(minValue, message);
export const max = (maxValue: number, message?: string) => ValidationFunctions.max(maxValue, message);
export const email = (message?: string) => ValidationFunctions.email(message);
export const custom = (customRule: (value: any) => boolean | string) => ValidationFunctions.custom(customRule);
export const minMaxLength = (minLen: number, maxLen: number, message?: string) => ValidationFunctions.minMaxLength(minLen, maxLen, message);
