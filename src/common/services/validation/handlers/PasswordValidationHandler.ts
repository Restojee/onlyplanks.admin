import { BaseValidationHandler } from '../BaseValidationHandler';
import { ValidationContext, ValidationResult } from '../types';




 
export class PasswordValidationHandler extends BaseValidationHandler {
  public priority = 70;

  validate(context: ValidationContext): ValidationResult {
    const { value, field, fieldKey } = context;
    const options = context.options || {};

    
    const valueToValidate = fieldKey ? this.getFieldValue(context, fieldKey) : value;
    const fieldName = fieldKey || field || 'пароль';

    
    if (this.isEmpty(valueToValidate) && !options.required) {
      return this.createSuccessResult();
    }

    const stringValue = String(valueToValidate);

    
    if (!stringValue) {
      if (options.required) {
        const message = options.message || `Поле ${fieldName} обязательно для заполнения`;
        return this.createErrorResult(message, fieldKey || field, 'REQUIRED');
      }
      return this.createSuccessResult();
    }

    
    const minLength = options.minLength || 8;
    if (stringValue.length < minLength) {
      const message = options.minLengthMessage || 
        `Пароль должен содержать не менее ${minLength} символов`;
      return this.createErrorResult(message, fieldKey || field, 'MIN_LENGTH');
    }

    
    if (typeof options.maxLength === 'number' && stringValue.length > options.maxLength) {
      const message = options.maxLengthMessage || 
        `Пароль должен содержать не более ${options.maxLength} символов`;
      return this.createErrorResult(message, fieldKey || field, 'MAX_LENGTH');
    }

    
    if (options.requireUppercase !== false) {
      if (!/[A-Z]/.test(stringValue)) {
        const message = options.uppercaseMessage || 'Пароль должен содержать хотя бы одну заглавную букву';
        return this.createErrorResult(message, fieldKey || field, 'REQUIRE_UPPERCASE');
      }
    }

    if (options.requireLowercase !== false) {
      if (!/[a-z]/.test(stringValue)) {
        const message = options.lowercaseMessage || 'Пароль должен содержать хотя бы одну строчную букву';
        return this.createErrorResult(message, fieldKey || field, 'REQUIRE_LOWERCASE');
      }
    }

    if (options.requireNumbers !== false) {
      if (!/\d/.test(stringValue)) {
        const message = options.numbersMessage || 'Пароль должен содержать хотя бы одну цифру';
        return this.createErrorResult(message, fieldKey || field, 'REQUIRE_NUMBERS');
      }
    }

    if (options.requireSpecialChars) {
      const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (!specialCharsRegex.test(stringValue)) {
        const message = options.specialCharsMessage || 
          'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*()_+-=[]{};\':"|,.<>/?)';
        return this.createErrorResult(message, fieldKey || field, 'REQUIRE_SPECIAL_CHARS');
      }
    }

    
    if (options.forbidSequences !== false) {
      
      const sequences = ['123456', 'abcdef', 'qwerty', 'password', 'admin'];
      const lowerValue = stringValue.toLowerCase();
      
      for (const sequence of sequences) {
        if (lowerValue.includes(sequence)) {
          const message = options.sequenceMessage || 
            'Пароль не должен содержать простые последовательности символов';
          return this.createErrorResult(message, fieldKey || field, 'FORBIDDEN_SEQUENCE');
        }
      }
    }

    
    if (options.maxRepeatingChars && options.maxRepeatingChars > 0) {
      const regex = new RegExp(`(.)\\1{${options.maxRepeatingChars},}`, 'i');
      if (regex.test(stringValue)) {
        const message = options.repeatingCharsMessage || 
          `Пароль не должен содержать более ${options.maxRepeatingChars} одинаковых символов подряд`;
        return this.createErrorResult(message, fieldKey || field, 'TOO_MANY_REPEATING_CHARS');
      }
    }

    return this.createSuccessResult();
  }

  


 
  validateWithFormContext(context: ValidationContext): ValidationResult {
    const { fieldKey, options = {} } = context;
    
    if (!this.hasFormContext(context) || !fieldKey) {
      return this.validate(context);
    }

    const formData = this.getFormData(context);
    const password = this.getFieldValue(context, fieldKey);

    
    const baseResult = this.validate(context);
    if (!baseResult.isValid) {
      return baseResult;
    }

    
    if (options.confirmPasswordField) {
      const confirmPassword = formData[options.confirmPasswordField];
      if (password !== confirmPassword) {
        const message = options.confirmPasswordMessage || 'Пароли не совпадают';
        return this.createErrorResult(message, fieldKey, 'PASSWORD_MISMATCH');
      }
    }

    
    if (options.forbiddenFields && Array.isArray(options.forbiddenFields)) {
      for (const forbiddenField of options.forbiddenFields) {
        const forbiddenValue = formData[forbiddenField];
        if (forbiddenValue && String(password).toLowerCase() === String(forbiddenValue).toLowerCase()) {
          const message = options.forbiddenFieldMessage || 
            `Пароль не должен совпадать с полем ${forbiddenField}`;
          return this.createErrorResult(message, fieldKey, 'PASSWORD_MATCHES_FORBIDDEN_FIELD');
        }
      }
    }

    return this.createSuccessResult();
  }

  canHandle(context: ValidationContext): boolean {
    const options = context.options || {};
    return options.type === 'password' || options.password === true;
  }
}