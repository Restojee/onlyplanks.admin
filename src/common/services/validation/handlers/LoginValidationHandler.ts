import { BaseValidationHandler } from '../BaseValidationHandler';
import { ValidationContext, ValidationResult } from '../types';




 
export class LoginValidationHandler extends BaseValidationHandler {
  public priority = 60;

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  validate(context: ValidationContext): ValidationResult {
    const { value, field, fieldKey } = context;
    const options = context.options || {};

    
    const valueToValidate = fieldKey ? this.getFieldValue(context, fieldKey) : value;
    const fieldName = fieldKey || field || 'логин';

    
    if (this.isEmpty(valueToValidate) && !options.required) {
      return this.createSuccessResult();
    }

    const stringValue = String(valueToValidate).trim();

    
    if (!stringValue) {
      if (options.required) {
        const message = options.message || `Поле ${fieldName} обязательно для заполнения`;
        return this.createErrorResult(message, fieldKey || field, 'REQUIRED');
      }
      return this.createSuccessResult();
    }

    
    const isEmail = stringValue.includes('@');
    
    if (isEmail) {
      
      if (!this.emailRegex.test(stringValue)) {
        const message = options.emailMessage || `Поле ${fieldName} должно содержать корректный email адрес`;
        return this.createErrorResult(message, fieldKey || field, 'INVALID_EMAIL');
      }
    } else {
      
      if (!this.usernameRegex.test(stringValue)) {
        const message = options.usernameMessage || 
          `Поле ${fieldName} должно содержать от 3 до 20 символов (буквы, цифры, подчеркивания)`;
        return this.createErrorResult(message, fieldKey || field, 'INVALID_USERNAME');
      }
    }

    
    if (typeof options.minLength === 'number' && stringValue.length < options.minLength) {
      const message = options.minLengthMessage || 
        `Поле ${fieldName} должно содержать не менее ${options.minLength} символов`;
      return this.createErrorResult(message, fieldKey || field, 'MIN_LENGTH');
    }

    
    if (typeof options.maxLength === 'number' && stringValue.length > options.maxLength) {
      const message = options.maxLengthMessage || 
        `Поле ${fieldName} должно содержать не более ${options.maxLength} символов`;
      return this.createErrorResult(message, fieldKey || field, 'MAX_LENGTH');
    }

    return this.createSuccessResult();
  }

  


 
  validateWithFormContext(context: ValidationContext): ValidationResult {
    const { fieldKey, options = {} } = context;
    
    if (!this.hasFormContext(context) || !fieldKey) {
      return this.validate(context);
    }

    const formData = this.getFormData(context);
    const loginValue = this.getFieldValue(context, fieldKey);

    
    const baseResult = this.validate(context);
    if (!baseResult.isValid) {
      return baseResult;
    }

    
    if (options.uniqueInForm && Array.isArray(options.uniqueInForm)) {
      const loginString = String(loginValue).toLowerCase();
      
      for (const otherField of options.uniqueInForm) {
        if (otherField !== fieldKey) {
          const otherValue = String(formData[otherField]).toLowerCase();
          if (otherValue && loginString === otherValue) {
            const message = options.uniqueMessage || 
              `Логин не должен совпадать с полем ${otherField}`;
            return this.createErrorResult(message, fieldKey, 'LOGIN_NOT_UNIQUE');
          }
        }
      }
    }

    
    if (options.matchPattern && options.matchPattern.field) {
      const patternField = formData[options.matchPattern.field];
      if (patternField) {
        const pattern = new RegExp(String(patternField));
        if (!pattern.test(String(loginValue))) {
          const message = options.matchPattern.message || 
            `Логин должен соответствовать паттерну из поля ${options.matchPattern.field}`;
          return this.createErrorResult(message, fieldKey, 'LOGIN_PATTERN_MISMATCH');
        }
      }
    }

    return this.createSuccessResult();
  }

  canHandle(context: ValidationContext): boolean {
    const options = context.options || {};
    return options.type === 'login' || options.login === true;
  }
}