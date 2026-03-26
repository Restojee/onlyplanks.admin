import { ValidationError } from 'class-validator';
import { FieldValidator } from './FieldValidator';



 
export class RequiredFieldValidator extends FieldValidator {
  async validate(value: any): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    if (this.isEmpty(value)) {
      errors.push(this.createValidationError(
        this.getFieldName(),
        { required: 'Поле обязательно для заполнения' }
      ));
    }

    return errors;
  }

  private isEmpty(value: any): boolean {
    return value === null || 
           value === undefined || 
           (typeof value === 'string' && value.trim() === '') ||
           (Array.isArray(value) && value.length === 0);
  }
}