import { BaseValidationHandler } from '../BaseValidationHandler';
import { ValidationContext, ValidationResult, ValidationError } from '../types';




 
export class LengthValidationHandler extends BaseValidationHandler {
  public priority = 40;

  validate(context: ValidationContext): ValidationResult {
    const { value, field, fieldKey } = context;
    const options = context.options || {};
    const errors: ValidationError[] = [];

    
    const valueToValidate = fieldKey ? this.getFieldValue(context, fieldKey) : value;
    const fieldName = fieldKey || field || 'значение';

    
    if (this.isEmpty(valueToValidate) && !options.required) {
      return this.createSuccessResult();
    }

    const stringValue = String(valueToValidate);
    const length = stringValue.length;

    
    if (typeof options.minLength === 'number' && length < options.minLength) {
      const message = options.minLengthMessage || 
        `Поле ${fieldName} должно содержать не менее ${options.minLength} символов`;
      errors.push({
        message,
        field: fieldKey || field,
        code: 'MIN_LENGTH',
        context: { minLength: options.minLength, actualLength: length }
      });
    }

    
    if (typeof options.maxLength === 'number' && length > options.maxLength) {
      const message = options.maxLengthMessage || 
        `Поле ${fieldName} должно содержать не более ${options.maxLength} символов`;
      errors.push({
        message,
        field: fieldKey || field,
        code: 'MAX_LENGTH',
        context: { maxLength: options.maxLength, actualLength: length }
      });
    }

    
    if (typeof options.exactLength === 'number' && length !== options.exactLength) {
      const message = options.exactLengthMessage || 
        `Поле ${fieldName} должно содержать ровно ${options.exactLength} символов`;
      errors.push({
        message,
        field: fieldKey || field,
        code: 'EXACT_LENGTH',
        context: { exactLength: options.exactLength, actualLength: length }
      });
    }

    return this.createMultipleErrorsResult(errors);
  }

  


 
  validateWithFormContext(context: ValidationContext): ValidationResult {
    const { fieldKey, options = {} } = context;
    
    if (!this.hasFormContext(context) || !fieldKey) {
      return this.validate(context);
    }

    const formData = this.getFormData(context);
    const fieldValue = this.getFieldValue(context, fieldKey);

    
    const baseResult = this.validate(context);
    if (!baseResult.isValid) {
      return baseResult;
    }

    
    if (options.dynamicMinLength && options.dynamicMinLength.field) {
      const referenceValue = formData[options.dynamicMinLength.field];
      if (referenceValue) {
        const dynamicMinLength = String(referenceValue).length + (options.dynamicMinLength.offset || 0);
        const currentLength = String(fieldValue).length;
        
        if (currentLength < dynamicMinLength) {
          const message = options.dynamicMinLength.message || 
            `Поле ${fieldKey} должно содержать не менее ${dynamicMinLength} символов (на основе поля ${options.dynamicMinLength.field})`;
          return this.createErrorResult(message, fieldKey, 'DYNAMIC_MIN_LENGTH');
        }
      }
    }

    
    if (options.dynamicMaxLength && options.dynamicMaxLength.field) {
      const referenceValue = formData[options.dynamicMaxLength.field];
      if (referenceValue) {
        const dynamicMaxLength = String(referenceValue).length + (options.dynamicMaxLength.offset || 0);
        const currentLength = String(fieldValue).length;
        
        if (currentLength > dynamicMaxLength) {
          const message = options.dynamicMaxLength.message || 
            `Поле ${fieldKey} должно содержать не более ${dynamicMaxLength} символов (на основе поля ${options.dynamicMaxLength.field})`;
          return this.createErrorResult(message, fieldKey, 'DYNAMIC_MAX_LENGTH');
        }
      }
    }

    return this.createSuccessResult();
  }

  canHandle(context: ValidationContext): boolean {
    const options = context.options || {};
    return typeof options.minLength === 'number' || 
           typeof options.maxLength === 'number' || 
           typeof options.exactLength === 'number';
  }
}