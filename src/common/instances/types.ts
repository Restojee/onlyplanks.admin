import { Constructor } from "@common/utils/di/types";
import { DIScope } from "@common/hocs/types";

export type GetInstance = <T>(key: string) => T

export type Provider = {
  key: string;
  provide: Constructor;
  scope?: DIScope;
  useFactory?: () => any;
}
