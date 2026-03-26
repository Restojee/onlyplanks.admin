import { GlobalInstances } from "@common/instances/GlobalInstances";






 
export const useGlobalInjection = <T>(identifier: any): T => {
  return GlobalInstances.get<T>(identifier);
}; 