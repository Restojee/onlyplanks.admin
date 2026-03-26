import { ValidationError } from 'class-validator';
import { FieldValidator } from './FieldValidator';



 
export class EmailFieldValidator extends FieldValidator {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async validate(value: any): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    if (value && typeof value === 'string' && !this.emailRegex.test(value)) {
      errors.push(this.createValidationError(
        this.getFieldName(),
        { email: 'Введите корректный email адрес' }
      ));
    }

    return errors;
  }
}