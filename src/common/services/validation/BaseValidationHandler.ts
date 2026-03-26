import { IValidationHandler, ValidationContext, ValidationResult, ValidationError, IDependencyProvider } from './types';



 
export abstract class BaseValidationHandler implements IValidationHandler {
  protected dependencyProvider: IDependencyProvider;
  public priority: number = 0;

  constructor(dependencyProvider?: IDependencyProvider) {
    this.dependencyProvider = dependencyProvider;
  }

  

 
  abstract validate(context: ValidationContext): Promise<ValidationResult> | ValidationResult;

  


 
  canHandle(context: ValidationContext): boolean {
    return true;
  }
  

 
  protected createSuccessResult(): ValidationResult {
    return {
      isValid: true,
      errors: []
    };
  }

  

 
  protected createErrorResult(message: string, field?: string, code?: string, context?: Record<string, any>): ValidationResult {
    return {
      isValid: false,
      errors: [{
        message,
        field,
        code,
        context
      }]
    };
  }

  

 
  protected getFieldValue(context: ValidationContext, fieldKey?: string): any {
    if (fieldKey && context.formData) {
      return context.formData[fieldKey];
    }
    return context.value;
  }

  

 
  protected getFormData(context: ValidationContext): Record<string, any> {
    return context.formData || context.data || {};
  }

  

 
  protected hasFormContext(context: ValidationContext): boolean {
    return !!(context.formData || context.data);
  }

  

 
  protected createMultipleErrorsResult(errors: ValidationError[]): ValidationResult {
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  

 
  protected isEmpty(value: any): boolean {
    return value === null || 
           value === undefined || 
           value === '' || 
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0);
  }
}
