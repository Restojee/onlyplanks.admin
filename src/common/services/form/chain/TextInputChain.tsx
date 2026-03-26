import { FormField } from '../FormField';

export class TextInputChain {
  protected field: FormField;
  protected componentKey: string;

  constructor(field: FormField, key: string) {
    this.field = field;
    this.componentKey = key;
  }

  public password() {
    this.field.setConfig({ type: 'password' });
    return this;
  }

  public email() {
    this.field.setConfig({ type: 'email' });
    return {
      mask: this.mask.bind(this)
    };
  }

  public date() {
    this.field.setConfig({ type: 'date' });
    return {
      mask: this.mask.bind(this)
    };
  }

  public tel() {
    this.field.setConfig({ type: 'tel' });
    return {
      mask: this.mask.bind(this)
    };
  }

  public title(title: string) {
    this.field.setTitle(title);
    return this;
  }

  public mask(mask: string) {
    this.field.setConfig({ mask });
    return this;
  }
}
