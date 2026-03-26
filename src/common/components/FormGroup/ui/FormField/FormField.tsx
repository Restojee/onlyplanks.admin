import * as React from 'react';
import { type FormFieldProps } from '@ui/FormGroup';
import { Column } from "@ui/Layout";

export const FormField: React.FC<FormFieldProps> = ({ children, className = '' }) => (
  <Column gap="xs" className="FormField">
    {children}
  </Column>
);
