import React, { FormEvent } from 'react';
import { GroupBuilder } from './GroupBuilder';
import { EntityDataHandler } from "@common/services/form/EntityDataHandler";
import Entity from "@common/store/entity/Entity";
import { ValidationError } from 'class-validator';
import { makeObservable, observable, action } from 'mobx';
import { 
  FormValidationHandler, 
  EntityValidator,
  RequiredFieldValidator,
  EmailFieldValidator 
} from './validators';
import { 
  ContainerManager, 
  ContainerComponentConfig
} from './containers/ContainerManager';
import { ContainerInstance } from './containers/ContainerManager';
import { ValidationBuilder } from './ui/builders/ValidationBuilder';
import { FormGroup } from "@ui/FormGroup/ui/Form";
class FormBuilder<E extends Entity = any> {
  public store: EntityDataHandler;
  public groups: React.ReactNode[] = [];
  public entity: E;
  public validationErrors: ValidationError[] = [];
  public isValid: boolean = true;
  public isDirty: boolean = false;
  public originalEntity: E;
  public validationHandler: FormValidationHandler<E>;
  public containerManager: ContainerManager;

  
  public onChangeCallbacks: Array<(entity: E, field: string, value: any) => void> = [];
  public onSubmitCallbacks: Array<(event: FormEvent, entity: E) => void | Promise<void>> = [];
  public onValidateCallbacks: Array<(entity: E, errors: ValidationError[]) => void> = [];

  constructor(entity: E) {
    this.entity = entity;
    this.originalEntity = { ...entity } as E; 
    this.store = new EntityDataHandler();
    this.validationHandler = new FormValidationHandler<E>();
    this.containerManager = new ContainerManager();

    

    
    
    this.setupFormIntegration();
    
    makeObservable(this, {
      validationErrors: observable,
      isValid: observable,
      isDirty: observable,
      entity: observable,
      updateEntity: action,
      resetEntity: action,
      validateEntity: action
    });
  }

  public group(callback: (groupBuilder: GroupBuilder, entity: E) => void) {
    const builder = new GroupBuilder(this.store, this);
    callback(builder, this.entity);
    
    
    const groupComponents = builder.render();
    const wrappedGroup = (
      <FormGroup key={`group-${this.groups.length}`}>
        {groupComponents}
      </FormGroup>
    );
    
    this.groups.push(wrappedGroup);
  }

  public render(): React.ReactNode[] {
    return this.groups;
  }

  get onSubmit() {
    const [onSubmitCallback] = this.onSubmitCallbacks;
    return (event: FormEvent) => {
      return onSubmitCallback(event, this.entity)
    };
  }

  public updateEntity(updates: Partial<E>): void {
    const changedFields: string[] = [];
    
    Object.keys(updates).forEach(key => {
      const oldValue = this.entity[key];
      const newValue = updates[key];
      
      if (oldValue !== newValue) {
        changedFields.push(key);
        this.entity[key] = newValue;
        
        this.onChangeCallbacks.forEach(callback => {
          callback(this.entity, key, newValue);
        });
      }
    });

    if (changedFields.length > 0) {
      this.isDirty = this.hasChanges();
    }
  }

  public resetEntity(): void {
    Object.assign(this.entity, this.originalEntity);
    this.isDirty = false;
    this.validationErrors = [];
    this.isValid = true;
  }

  private hasChanges(): boolean {
    return Object.keys(this.entity).some(key => 
      this.entity[key] !== this.originalEntity[key]
    );
  }

  public async validateEntity(): Promise<boolean> {
    try {
      const errors = await this.validationHandler.validateForm(this.entity);
      this.validationErrors = errors;
      this.isValid = errors.length === 0;

      this.onValidateCallbacks.forEach(callback => {
        callback(this.entity, errors);
      });

      return this.isValid;
    } catch (error) {
      console.error('Validation error:', error);
      this.isValid = false;
      return false;
    }
  }

  public getFieldErrors(fieldName: string): string[] {
    return this.validationHandler.getFieldErrors(this.validationErrors, fieldName);
  }

  public hasFieldErrors(fieldName: string): boolean {
    return this.validationHandler.hasFieldErrors(this.validationErrors, fieldName);
  }

  public async saveEntity(): Promise<E> {
    const isValid = await this.validateEntity();
    
    if (!isValid) {
      throw new Error('Entity validation failed. Cannot save invalid entity.');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        this.originalEntity = { ...this.entity } as E;
        this.isDirty = false;
        resolve(this.entity);
      }, 100);
    });
  }

  public onChange(callback: (entity: E, field: string, value: any) => void): FormBuilder<E> {
    this.onChangeCallbacks.push(callback);
    return this;
  }

  public withSubmit(callback: (event: FormEvent) => void ): FormBuilder<E> {
    this.onSubmitCallbacks.push(callback);
    return this;
  }

  public onValidate(callback: (entity: E, errors: ValidationError[]) => void): FormBuilder<E> {
    this.onValidateCallbacks.push(callback);
    return this;
  }

  public getValidationErrors(): ValidationError[] {
    return this.validationErrors;
  }

  public getIsValid(): boolean {
    return this.isValid;
  }

  public getIsDirty(): boolean {
    return this.isDirty;
  }

  public addFieldValidator(fieldName: string, validator: any): FormBuilder<E> {
    this.validationHandler.addFieldValidator(fieldName, validator);
    return this;
  }

  public setEntityValidator(validator: EntityValidator<E>): FormBuilder<E> {
    this.validationHandler.setEntityValidator(validator);
    return this;
  }

  public async validateField(fieldName: string, value: any): Promise<ValidationError[]> {
    return await this.validationHandler.validateField(fieldName, value);
  }


  private setupFormIntegration(): void {

  }

  public validate(callback: (validationBuilder: ValidationBuilder<E>) => void): FormBuilder<E> {
    const validationBuilder = new ValidationBuilder<E>(this.validationHandler);
    callback(validationBuilder);
    validationBuilder.apply();
    return this;
  }
}

export default FormBuilder;
