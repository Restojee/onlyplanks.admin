import { ValidationError } from 'class-validator';
import Entity from '@common/store/entity/Entity';
import { FieldValidator } from '../field/FieldValidator';
import { EntityValidator } from '../entity/EntityValidator';
import { FormField } from '../../FormField';
import { ValidationRule } from '../../ui/builders/ValidationUtils';



 
export class FormValidationHandler<E extends Entity> {
  private fieldValidators: Map<string, FieldValidator[]> = new Map();
  private entityValidator?: EntityValidator<E>;
  private globalValidators: any[] = [];
  private globalValidationRules: ValidationRule[] = [];

  

 
  addFieldValidator(fieldName: string, validator: FieldValidator): void {
    if (!this.fieldValidators.has(fieldName)) {
      this.fieldValidators.set(fieldName, []);
    }
    this.fieldValidators.get(fieldName)!.push(validator);
  }

  

 
  setEntityValidator(validator: EntityValidator<E>): void {
    this.entityValidator = validator;
  }

  

 
  addGlobalValidator(validator: any): void {
    this.globalValidators.push(validator);
  }

  

 
  addGlobalValidationRule(rule: ValidationRule): void {
    this.globalValidationRules.push(rule);
  }

  

 
  addValidationHandler(handler: any): void {
    this.globalValidators.push(handler);
  }

  

 
  clearGlobalValidators(): void {
    this.globalValidators = [];
    this.globalValidationRules = [];
  }

  

 
  async validateField(fieldName: string, value: any): Promise<ValidationError[]> {
    const validators = this.fieldValidators.get(fieldName) || [];
    const errors: ValidationError[] = [];

    for (const validator of validators) {
      const fieldErrors = await validator.validate(value);
      errors.push(...fieldErrors);
    }

    return errors;
  }

  

 
  async validateEntity(): Promise<ValidationError[]> {
    if (!this.entityValidator) {
      return [];
    }

    return await this.entityValidator.validate();
  }

  

 
  async validateForm(entity: E): Promise<ValidationError[]> {
    const allErrors: ValidationError[] = [];

    
    for (const [fieldName, validators] of this.fieldValidators) {
      const fieldValue = (entity as any)[fieldName];
      for (const validator of validators) {
        const fieldErrors = await validator.validate(fieldValue);
        allErrors.push(...fieldErrors);
      }
    }

    
    const entityErrors = await this.validateEntity();
    allErrors.push(...entityErrors);

    
    const globalErrors = await this.validateGlobalValidators(entity);
    allErrors.push(...globalErrors);

    return allErrors;
  }

  

 
  private async validateGlobalValidators(entity: E): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    
    for (const validator of this.globalValidators) {
      if (validator && typeof validator.validate === 'function') {
        try {
          
          const context = {
            value: entity,
            field: 'form',
            options: {},
            formData: entity, 
            fieldKey: validator.fieldKey || 'form' 
          };
          
          const result = await validator.validate(context);
          if (result && !result.isValid && result.errors) {
            errors.push(...result.errors);
          }
        } catch (error) {
          
          const validationError = new ValidationError();
          validationError.property = validator.fieldKey || 'form';
          validationError.constraints = { global: error.message || 'Global validation failed' };
          errors.push(validationError);
        }
      }
    }

    
    for (const rule of this.globalValidationRules) {
      const ruleErrors = await this.validateGlobalRule(rule, entity);
      errors.push(...ruleErrors);
    }

    return errors;
  }

  

 
  private async validateGlobalRule(rule: ValidationRule, entity: E): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    try {
      const fieldKey = rule.fieldKey || 'form';
      const fieldValue = rule.fieldKey ? (entity as any)[rule.fieldKey] : entity;

      switch (rule.type) {
        case 'custom':
          if (rule.validator) {
            
            const context = {
              value: fieldValue,
              field: fieldKey,
              formData: entity,
              fieldKey: fieldKey
            };
            const result = rule.validator(context);
            if (result && !result.isValid) {
              const validationError = new ValidationError();
              validationError.property = fieldKey;
              validationError.constraints = { 
                custom: result.error || rule.message || 'Custom validation failed' 
              };
              errors.push(validationError);
            }
          }
          break;
        case 'min':
          if (rule.fieldKey && rule.value !== undefined) {
            
            if (typeof fieldValue === 'string' && fieldValue.length < rule.value) {
              const validationError = new ValidationError();
              validationError.property = fieldKey;
              validationError.constraints = { 
                min: rule.message || `Минимальная длина: ${rule.value}` 
              };
              errors.push(validationError);
            } else if (typeof fieldValue === 'number' && fieldValue < rule.value) {
              const validationError = new ValidationError();
              validationError.property = fieldKey;
              validationError.constraints = { 
                min: rule.message || `Минимальное значение: ${rule.value}` 
              };
              errors.push(validationError);
            }
          }
          break;
        case 'max':
          if (rule.fieldKey && rule.value !== undefined) {
            
            if (typeof fieldValue === 'string' && fieldValue.length > rule.value) {
              const validationError = new ValidationError();
              validationError.property = fieldKey;
              validationError.constraints = { 
                max: rule.message || `Максимальная длина: ${rule.value}` 
              };
              errors.push(validationError);
            } else if (typeof fieldValue === 'number' && fieldValue > rule.value) {
              const validationError = new ValidationError();
              validationError.property = fieldKey;
              validationError.constraints = { 
                max: rule.message || `Максимальное значение: ${rule.value}` 
              };
              errors.push(validationError);
            }
          }
          break;
      }
    } catch (error) {
      const validationError = new ValidationError();
      validationError.property = rule.fieldKey || 'form';
      validationError.constraints = { 
        rule: error.message || `Rule validation failed: ${rule.type}` 
      };
      errors.push(validationError);
    }

    return errors;
  }

  

 
  getFieldErrors(errors: ValidationError[], fieldName: string): string[] {
    return errors
      .filter(error => error.property === fieldName)
      .map(error => Object.values(error.constraints || {}).join(', '))
      .filter(message => message.length > 0);
  }

  

 
  hasFieldErrors(errors: ValidationError[], fieldName: string): boolean {
    return errors.some(error => error.property === fieldName);
  }
}
