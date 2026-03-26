import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from "react";

type FieldValue = any;

export class FormField {
  title: string = '';
  key: string;
  name: string; 
  value: FieldValue;
  error?: string;
  config: any = {};
  placeholder?: string;
  disabled?: boolean = false;
  required?: boolean = false;
  touched: boolean = false;

  constructor(key: string, initialValue: FieldValue, title?: string) {
    this.key = key;
    this.name = key; 
    this.value = initialValue;
    this.title = title;

    makeAutoObservable(this);
  }

  setValue(value: FieldValue) {
    this.value = value;
  }

  onChange(event: ChangeEvent<any>) {
    this.setValue(event.target.value);
  }

  setError(error: string) {
    this.error = error;
  }

  getError(): string {
    return this.error;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setConfig(config: Partial<any>) {
    this.config = { ...this.config, ...config };
  }

  getConfig() {
    return this.config;
  }
}
