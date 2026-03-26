import { FormField } from '../FormField';

export class FileUploadChain {
  protected field: FormField;
  protected componentKey: string;

  constructor(field: FormField, key: string) {
    this.field = field;
    this.componentKey = key;
  }

  public avatar() {
    this.field.setConfig({ avatar: true });
    return this;
  }

  public title(title: string) {
    this.field.setTitle(title);
    return this;
  }
}
