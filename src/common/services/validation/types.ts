

 
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}



 
export interface ValidationError {
  field?: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}



 
export interface ValidationContext {
  value: any;
  field?: string;
  data?: Record<string, any>;
  options?: Record<string, any>;
  
  formData?: Record<string, any>;
  fieldKey?: string;
}



 
export interface IValidationHandler {
  validate(context: ValidationContext): Promise<ValidationResult> | ValidationResult;
  canHandle(context: ValidationContext): boolean;
  priority?: number;
}



 
export interface IDependencyProvider {
  get<T>(token: string | symbol | Function): T;
  has(token: string | symbol | Function): boolean;
}



 
export interface IValidator {
  validate<T extends IValidationHandler>(
    context: ValidationContext,
    handlerClass: new (...args: any[]) => T
  ): Promise<ValidationResult>;
  
  validateWithHandler(
    context: ValidationContext,
    handler: IValidationHandler
  ): Promise<ValidationResult>;
}



 
export interface ValidationOptions {
  stopOnFirstError?: boolean;
  parallel?: boolean;
  timeout?: number;
}



 
export interface ValidationMetadata {
  field: string;
  rules: ValidationRule[];
}



 
export interface ValidationRule {
  type: string;
  options?: Record<string, any>;
  message?: string;
  handlerClass?: new (...args: any[]) => IValidationHandler;
}