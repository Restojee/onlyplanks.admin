import { BaseValidationHandler } from '../BaseValidationHandler';
import { ValidationContext, ValidationResult } from '../types';




 
export class RequiredValidationHandler extends BaseValidationHandler {
  public priority = 100; 

  validate(context: ValidationContext): ValidationResult {
    const { value, field, fieldKey } = context;
    const options = context.options || {};
    
    
    if (!options.required) {
      return this.createSuccessResult();
    }

    
    
    const valueToValidate = fieldKey ? this.getFieldValue(context, fieldKey) : value;
    const fieldName = fieldKey || field || 'значение';

    
    if (this.isEmpty(valueToValidate)) {
      const message = options.message || `Поле ${fieldName} обязательно для заполнения`;
      return this.createErrorResult(message, fieldKey || field, 'REQUIRED');
    }

    return this.createSuccessResult();
  }

  canHandle(context: ValidationContext): boolean {
    return context.options?.required === true;
  }

  


 
  validateWithFormContext(context: ValidationContext, requiredCondition?: (formData: Record<string, any>) => boolean): ValidationResult {
    if (!this.hasFormContext(context)) {
      return this.validate(context);
    }

    const formData = this.getFormData(context);
    const { fieldKey, field } = context;
    
    
    if (requiredCondition && !requiredCondition(formData)) {
      return this.createSuccessResult();
    }

    const valueToValidate = this.getFieldValue(context, fieldKey);
    const fieldName = fieldKey || field || 'значение';

    if (this.isEmpty(valueToValidate)) {
      const message = `Поле ${fieldName} обязательно для заполнения`;
      return this.createErrorResult(message, fieldKey || field, 'REQUIRED', { formData });
    }

    return this.createSuccessResult();
  }
}