const fieldMetaKey = Symbol('field');

export function Field(name: string): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(fieldMetaKey, name, target, propertyKey);
  };
}

export function getFieldName(target: any, propertyKey: string | symbol): string {
  return Reflect.getMetadata(fieldMetaKey, target, propertyKey);
}
