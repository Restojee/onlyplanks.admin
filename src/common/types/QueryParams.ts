export type QueryParams<T extends Record<string, any> = Record<string, any>> = {
  query?: string;
} & T;
