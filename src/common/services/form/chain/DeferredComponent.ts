import React from 'react';
import { FormField } from '../FormField';





 
export abstract class DeferredComponent {
  protected field: FormField;
  protected componentKey: string;
  protected isRendered: boolean = false;

  constructor(field: FormField, key: string) {
    this.field = field;
    this.componentKey = key;
  }

  

 
  abstract createComponent(): React.ReactNode;

  

 
  protected getTitle(): string {
    return this.field.getConfig()?.title || this.field.title;
  }

  

 
  protected getError(): string {
    return this.field.getError();
  }

  

 
  markAsRendered(): void {
    this.isRendered = true;
  }

  

 
  isComponentRendered(): boolean {
    return this.isRendered;
  }
}
