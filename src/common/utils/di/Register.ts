import { InstanceKey, LifecycleType } from "@common/utils/di/types";
import { Container } from "@common/utils/di/Container";

export function Register(lifecycle: LifecycleType = LifecycleType.Transient) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    
    
  }
}