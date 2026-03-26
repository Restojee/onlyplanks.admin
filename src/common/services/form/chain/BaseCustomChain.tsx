import { FormField } from '../FormField';

export class BaseCustomChain {
  protected field: FormField;

  constructor(field: FormField) {
    this.field = field;
  }

  public title(title: string) {
    this.field.setTitle(title);
    return this;
  }

  public config(config: any) {
    this.field.setConfig(config);
    return this;
  }
}