import { BaseValidationHandler } from '../BaseValidationHandler';
import { ValidationContext, ValidationResult } from '../types';




 
export class EmailValidationHandler extends BaseValidationHandler {
  public priority = 50;

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validate(context: ValidationContext): ValidationResult {
    const { value, field, fieldKey } = context;
    const options = context.options || {};

    
    const valueToValidate = fieldKey ? this.getFieldValue(context, fieldKey) : value;
    const fieldName = fieldKey || field || 'email';

    
    if (this.isEmpty(valueToValidate) && !options.required) {
      return this.createSuccessResult();
    }

    
    if (!this.emailRegex.test(String(valueToValidate))) {
      const message = options.message || `Поле ${fieldName} должно содержать корректный email адрес`;
      return this.createErrorResult(message, fieldKey || field, 'INVALID_EMAIL');
    }

    return this.createSuccessResult();
  }

  canHandle(context: ValidationContext): boolean {
    const options = context.options || {};
    return options.type === 'email' || options.email === true;
  }

  


 
  validateWithFormContext(context: ValidationContext, uniqueCheck?: (email: string, formData: Record<string, any>) => boolean): ValidationResult {
    const basicResult = this.validate(context);
    
    if (!basicResult.isValid || !this.hasFormContext(context)) {
      return basicResult;
    }

    const { fieldKey, field } = context;
    const valueToValidate = this.getFieldValue(context, fieldKey);
    const formData = this.getFormData(context);

    
    if (uniqueCheck && !uniqueCheck(String(valueToValidate), formData)) {
      const fieldName = fieldKey || field || 'email';
      const message = `Email ${valueToValidate} уже используется в форме`;
      return this.createErrorResult(message, fieldKey || field, 'DUPLICATE_EMAIL', { formData });
    }

    return this.createSuccessResult();
  }
}