import { InstanceKey } from "@common/utils/di/types";

export function Inject(token: InstanceKey) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Injecting dependency for: ${target.constructor.name}, param index: ${parameterIndex}`);
    const existingTokens: InstanceKey[] = Reflect.getOwnMetadata("inject:tokens", target) || [];
    existingTokens[parameterIndex] = token;
    Reflect.defineMetadata("inject:tokens", existingTokens, target);
  };
}