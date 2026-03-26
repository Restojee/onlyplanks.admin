import { makeAutoObservable } from 'mobx';
import { FormField } from './FormField';

export class EntityDataHandler {
  private fields: Map<string, FormField> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  getField(key: string): FormField {
    if (!this.fields.has(key)) {
      this.fields.set(key, new FormField(key, ''));
    }
    return this.fields.get(key)!;
  }

  getValues(): Record<string, any> {
    const values: Record<string, any> = {};
    this.fields.forEach((field, key) => {
      values[key] = field.value;
    });
    return values;
  }
}
