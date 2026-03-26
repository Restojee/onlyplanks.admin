import * as React from 'react';
import { type FormFieldLabelProps } from '@ui/FormGroup';
import { Column } from "@ui/Layout";
import { Typography } from "@ui/Typography";

export const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor}>
    <Column pl="xs">
      <Typography size="sm">
        {children}
      </Typography>
    </Column>
  </label>
);
