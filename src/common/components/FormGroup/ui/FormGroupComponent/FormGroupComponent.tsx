import * as React from 'react';
import { type FormGroupProps } from '@ui/FormGroup';
import { Row } from "@ui/Layout";

export const FormGroupComponent: React.FC<FormGroupProps> = ({ children, className = '' }) => (
  <Row gap="md">
    {children}
  </Row>
);
