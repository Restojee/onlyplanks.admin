import { FormField } from '../FormField';
import FormBuilder from '@common/services/form/FormBuilder';
import { FormEvent } from 'react';

export class ButtonChain {
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

  public submit(callback?: (event: FormEvent) => void) {
    this.field.setConfig({ type: 'submit' });
    return this;
  }

  public withProps(props: {}) {
    this.field.setConfig({ props });
    return this;
  }
}
