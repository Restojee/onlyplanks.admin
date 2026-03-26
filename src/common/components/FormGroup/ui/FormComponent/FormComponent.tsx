import * as React from 'react';
import { type FormProps } from '@ui/FormGroup';
import { Column } from "@ui/Layout";
import { FormEvent } from 'react';

export const FormComponent: React.FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <Column element="form" onSubmit={handleSubmit}>
      <Column gap="md">
        {children}
      </Column>
    </Column>
  )
}
