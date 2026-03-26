import { FormField } from '../FormField';

export class RadioChain {
  protected field: FormField;
  protected componentKey: string;

  constructor(field: FormField, key: string) {
    this.field = field;
    this.componentKey = key;
  }

  public title(title: string) {
    this.field.setTitle(title);
    return this;
  }
}
