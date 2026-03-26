import type { AnyObjectSchema, ValidationError } from 'yup';

export type FieldErrors<T extends Record<string, any>> = Partial<Record<keyof T, string>>;

const getFirstYupMessage = (e: unknown): { path?: string; message?: string } => {
  const err = e as ValidationError | any;

  const inner = Array.isArray(err?.inner) ? err.inner : [];
  if (inner.length > 0) {
    const first = inner.find((x: any) => x?.message);
    return { path: first?.path, message: first?.message };
  }

  return { path: err?.path, message: err?.message };
};

export const getYupErrorsByPath = <T extends Record<string, any>>(e: unknown): FieldErrors<T> => {
  const err = e as ValidationError | any;
  const errors: Record<string, string> = {};

  const inner = Array.isArray(err?.inner) ? err.inner : [];
  if (inner.length > 0) {
    for (const item of inner) {
      const path = item?.path;
      const message = item?.message;
      if (path && message && !errors[path]) {
        errors[path] = message;
      }
    }
    return errors as FieldErrors<T>;
  }

  if (err?.path && err?.message) {
    errors[err.path] = err.message;
  }

  return errors as FieldErrors<T>;
};

export const validateYupForm = async <T extends Record<string, any>>(
  schema: AnyObjectSchema,
  data: T
): Promise<{ isValid: boolean; errors: FieldErrors<T> }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (e: any) {
    return { isValid: false, errors: getYupErrorsByPath<T>(e) };
  }
};

export const validateYupField = async <T extends Record<string, any>>(
  schema: AnyObjectSchema,
  data: T,
  field: string
): Promise<{ isValid: boolean; error?: string }> => {
  try {
    await schema.validateAt(field, data);
    return { isValid: true, error: undefined };
  } catch (e: any) {
    const { message } = getFirstYupMessage(e);
    return { isValid: false, error: message || 'Некорректное значение' };
  }
};
