import State from "@common/hocs/withView/decorators/State";
import Action from "@common/hocs/withView/decorators/Action";
import { BaseFieldViewModel } from "@common/services/form/containers";
import Computed from '@common/hocs/withView/decorators/Computed';
import { FormEvent, MouseEvent } from 'react';

export class FormButtonViewModel extends BaseFieldViewModel {

  @State()
  onSubmit?: () => void;

  @State()
  disabled: boolean = false;

  @Action()
  setTitle(title: string): void {
    this.field.setConfig({ title });
  }

  @Action()
  setOnSubmit(onSubmit: () => void): void {
    this.field.setConfig({ onSubmit });
  }

  @Action()
  setDisabled(disabled: boolean): void {
    this.field.setConfig({ disabled });
  }

  @Computed()
  get buttonType() {
    return this.field.config.type;
  }

  @Action()
  handleClick = (event: MouseEvent): void => {
    if (this.buttonType === "button") {
      this.field.config.onClick();
    }
  }

  @Action()
  handleSubmit = (event: FormEvent): void => {
    if (this.buttonType === "submit") {
      this.field.config.onSubmit();
    }
  }

  @Computed()
  get currentProps() {
    return this.field.config.props;
  }

  @Computed()
  get currentTitle(): string {
    return this.currentProps.title;
  }

  @Computed()
  get isDisabled(): boolean {
    return this.field.config.disabled;
  }
}
