import type * as React from 'react';
import { FormEvent } from 'react';

export interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  error?: string;
  valid?: boolean;
}

export interface FormRowProps {
  children?: React.ReactNode;
}

export interface FormProps {
  children?: React.ReactNode;
  onSubmit?(event: FormEvent): void;
  
}


export interface FormGroupProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormFieldProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormFieldLabelProps {
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export interface FormFieldItemProps {
  children?: React.ReactNode;
  error?: string;
  className?: string;
}
