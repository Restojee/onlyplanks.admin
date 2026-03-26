export type Constructor<T = any, Args extends any[] = any[]> = new (...args: Args) => T;

export enum LifecycleType {
  Singleton,
  Transient
}

export interface RegistrationOptions {
  constructor: Constructor<any>;
  lifecycle: LifecycleType;
  instance?: any;
}

export interface Disposable {
  dispose(): void;
}

export type InstanceKey = string;
