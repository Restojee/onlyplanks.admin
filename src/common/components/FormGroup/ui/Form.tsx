import * as React from 'react';
import { FormRowComponent } from '@ui/FormGroup/ui/FormRow';
import { FormComponent } from './FormComponent/FormComponent';
import { FormGroupComponent } from './FormGroupComponent/FormGroupComponent';
import { FormField } from './FormField/FormField';
import { FormFieldLabel } from './FormFieldLabel/FormFieldLabel';
import { FormFieldItem } from './FormFieldItem/FormFieldItem';


export const FormGroup = FormGroupComponent;


export const Form = Object.assign(FormComponent, {
  Field: Object.assign(FormField, {
    Label: FormFieldLabel,
    Item: FormFieldItem,
  }),
  Row: FormRowComponent,
});
