import State from "@common/hocs/withView/decorators/State";
import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";
import { ViewModel } from "@common/hocs/withView";
import { FormField } from "@common/services/form/FormField";
import { ChangeEvent } from "react";

export interface BaseFieldProps {
  field: FormField;
}

export class BaseFieldViewModel extends ViewModel<BaseFieldProps> {
  @State()
  options = [];

  constructor() {
    super();
  }

  public get field(): FormField {
    return this.props.field;
  }

  @Action()
  setTitle(title: string): void {
    this.field.setConfig({ title });
  }

  @Action()
  setPlaceholder(placeholder: string): void {
    this.field.setConfig({ placeholder });
  }

  @Action()
  setType(type: string): void {
    this.field.setConfig({ type });
  }

  @Computed()
  get hasError(): boolean {
    return !!this.field.error && this.field.touched;
  }

  @Computed()
  public get currentPlaceholder(): string {
    return this.field.placeholder;
  }

  @Computed()
  get isValid(): boolean {
    return !this.hasError;
  }

  @Computed()
  get defaultPlaceholder(): string {
    
    return '';
  }

  @Action()
  setValue(newValue: any): void {
    this.field.touched = true;
    this.field.setValue(newValue);
    this.clearError();
  }

  @Action()
  onChange = (event: ChangeEvent<any>): void => {
    this.field.onChange(event);
  }

  @Computed()
  get type(): string {
    return this.field.config.type;
  }

  @Action()
  setError(errorMessage: string): void {
    this.field.error = errorMessage;
  };

  @Action()
  clearError(): void {
    this.field.error = undefined;
  }

  @Action()
  reset(): void {
    this.field.setValue(null);
    this.field.error = undefined;
    this.field.touched = false;
  };

  @Computed()
  get currentValue(): any {
    return this.field?.value;
  }

  @Computed()
  get currentError(): string {
    return this.field?.error;
  }

  @Computed()
  get currentOptions() {
    return this.field?.config.options;
  }
}



 
export class TextFieldViewModel extends BaseFieldViewModel {

}



 
export class PasswordViewModel extends TextFieldViewModel {

}



 
export class EmailViewModel extends TextFieldViewModel {

}



 
export class NumberViewModel extends BaseFieldViewModel {

}
