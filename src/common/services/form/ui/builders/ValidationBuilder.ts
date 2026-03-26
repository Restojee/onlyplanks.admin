import { ValidationRule, BuilderFunction, integrate } from './ValidationUtils';
import { FormValidationHandler } from '../../validators';
import { BaseValidationHandler } from '@common/services/validation/BaseValidationHandler';
import Entity from '@common/store/entity/Entity';




 
export class ValidationBuilder<E extends Entity> {
  private validationHandler: FormValidationHandler<E>;
  private globalValidationRules: ValidationRule[] = [];

  constructor(validationHandler: FormValidationHandler<E>) {
    this.validationHandler = validationHandler;
  }

  public addValidationRules(...items: (BuilderFunction | ValidationRule | BaseValidationHandler | any)[]): void {
    let currentMode: 'Change' | 'Blur' | 'Submit' = undefined;
    let currentFieldKey: string;

    items.forEach(item => {
      
      if (item instanceof BaseValidationHandler) {
        this.validationHandler.addValidationHandler(item);
        return;
      }

      if (typeof item === 'function') {
        const finalConfig = integrate(item);

        if (finalConfig.mode) {
          currentMode = finalConfig.mode;
        }

        if (finalConfig.fieldKey) {
          currentFieldKey = finalConfig.fieldKey;
        }

        if (finalConfig.validators) {
          finalConfig.validators.forEach(validator => {
            if (currentMode) {
              validator.mode = currentMode;
            }
            if (currentFieldKey) {
              validator.fieldKey = currentFieldKey;
            }
            this.validationHandler.addGlobalValidator(validator);
          });
        }
      }
    });
  }

  public apply(): void {
    this.globalValidationRules.forEach(rule => {
      this.validationHandler.addGlobalValidationRule(rule);
    });
  }

  public clear(): void {
    this.globalValidationRules = [];
    this.validationHandler.clearGlobalValidators();
  }

  public getValidationRules(): ValidationRule[] {
    return [...this.globalValidationRules];
  }
}
