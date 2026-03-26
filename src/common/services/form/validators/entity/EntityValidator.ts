import { ValidationError, validate } from 'class-validator';
import Entity from '@common/store/entity/Entity';



 
export abstract class EntityValidator<E extends Entity> {
  protected entity: E;

  constructor(entity: E) {
    this.entity = entity;
  }

  

 
  async validateWithDecorators(): Promise<ValidationError[]> {
    return await validate(this.entity);
  }

  


 
  async validateCustom(): Promise<ValidationError[]> {
    return [];
  }

  

 
  async validate(): Promise<ValidationError[]> {
    const decoratorErrors = await this.validateWithDecorators();
    const customErrors = await this.validateCustom();
    
    return [...decoratorErrors, ...customErrors];
  }

  

 
  protected createValidationError(property: string, constraints: Record<string, string>): ValidationError {
    const error = new ValidationError();
    error.property = property;
    error.constraints = constraints;
    return error;
  }
}