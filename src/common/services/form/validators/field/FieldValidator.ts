import { ValidationError } from 'class-validator';
import { FormField } from '../../FormField';



 
export abstract class FieldValidator {
  protected field: FormField;

  constructor(field: FormField) {
    this.field = field;
  }

  



 
  abstract validate(value: any): Promise<ValidationError[]>;

  

 
  protected getFieldName(): string {
    return this.field.key;
  }

  

 
  protected createValidationError(property: string, constraints: Record<string, string>): ValidationError {
    const error = new ValidationError();
    error.property = property;
    error.constraints = constraints;
    return error;
  }
}