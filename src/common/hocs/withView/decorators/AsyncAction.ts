import { Metadata } from '@common/hocs/withView/constants';
import { AsyncServiceInjectKey } from '@common/services/async';
import { Notification } from '@ui/Notification';
import { handleHttpError } from '@common/utils/httpErrorHandler';

function AsyncAction(): MethodDecorator {
  return (target: any, key, descriptor: PropertyDescriptor) => {
    const ctor = target.constructor;
    const actions = Reflect.getMetadata(Metadata.action, ctor) || [];
    actions.push(key);
    Reflect.defineMetadata(Metadata.action, actions, ctor);

    const asyncActions = Reflect.getMetadata(Metadata.asyncAction, ctor) || [];
    asyncActions.push(key);
    Reflect.defineMetadata(Metadata.asyncAction, asyncActions, ctor);

    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') {
      throw new TypeError(`[AsyncAction] ${String(key)} is not a function. Use @AsyncAction only on class methods.`);
    }

    descriptor.value = async function (...args: unknown[]) {
      if (!this) {
        throw new TypeError(`[AsyncAction] ${String(key)} was called without 'this'. Bind the method before passing it as a callback.`);
      }

      const container = Reflect.getMetadata(Metadata.container, this);
      
      let asyncService = null;
      if (container) {
        try {
          asyncService = container.get(AsyncServiceInjectKey);
        } catch (e) {
        }
      }
      
      if (asyncService) {
        asyncService.startAsyncOperation();
      }

      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        if (!error.__notificationShown) {
          error.__notificationShown = true;
          console.error(`[AsyncAction] Error in ${String(key)}:`, error);
          const { title, message, system } = handleHttpError(error);
          Notification.error(title, message, undefined, system);
        }
        throw error;
      } finally {
        if (asyncService) {
          asyncService.endAsyncOperation();
        }
      }
    };

    return descriptor;
  };
}

export default AsyncAction;
