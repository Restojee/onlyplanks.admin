import FormBuilder from "@common/services/form/FormBuilder";
import Entity from "@common/store/entity/Entity";

export type FieldValue = string | number | boolean | File ;

export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'date'
  | 'tel'
  | 'file'
  | 'combobox'
  | 'radio'
  | 'button';

export interface FieldOption {
  label: string;
  value: string | number | boolean;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  mask?: string;
  options?: FieldOption[];
  validators?: ValidatorFn[];
  isAvatar?: boolean;
}

export type FormValues = Record<string, FieldValue>;

export type ValidatorFn = (value: FieldValue, values?: FormValues) => string ;

export interface FieldValidationConfig {
  field: string;
  mode: 'Changed' | 'Blured' | 'Submit';
  custom?: ValidatorFn;
}

export type GroupBuilderCallback = (builder: any) => void;

export type FormSchemaCallback<T> = (
  formBuilder: any,
  request: T
) => void;


export interface FormBuilderProps<E extends Entity> {
  formBuilder: FormBuilder<E>
}
