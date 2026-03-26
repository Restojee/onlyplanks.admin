import { createContext, useContext } from "react";
import { Instances } from "@common/instances/Instances";

export const DIContext = createContext<Instances>(null);

export const useInjection = <T>(identifier: any): T => {
  const container = useContext<Instances>(DIContext);

  if (!container) {
    throw new Error('DI container not found!');
  }

  return container.get<T>(identifier);
};
