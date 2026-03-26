import type { NotificationType } from './NotificationContext';

type NotificationHandler = (type: NotificationType, title: string, message: string, duration?: number, system?: string[]) => void;
type ErrorHandler = (error: any) => void;


class NotificationEventBus {
  private notificationHandler: NotificationHandler  = null;
  private errorHandler: ErrorHandler  = null;

  public registerHandler(handler: NotificationHandler, errorHandler: ErrorHandler): void {
    this.notificationHandler = handler;
    this.errorHandler = errorHandler;
  }

  public unregisterHandler(): void {
    this.notificationHandler = null;
    this.errorHandler = null;
  }

  public notify(type: NotificationType, title: string, message: string, duration?: number, system?: string[]): void {
    if (this.notificationHandler) {
      this.notificationHandler(type, title, message, duration, system);
    } else {
      console.warn('[NotificationEventBus] Handler not registered:', { type, title, message });
    }
  }

  public success(title: string, message: string, duration?: number): void {
    this.notify('success', title, message, duration);
  }

  public error(title: string, message: string, duration?: number, system?: string[]): void {
    this.notify('error', title, message, duration, system);
  }

  public warning(title: string, message: string, duration?: number): void {
    this.notify('warning', title, message, duration);
  }

  public info(title: string, message: string, duration?: number): void {
    this.notify('info', title, message, duration);
  }

  public handleHttpError(error: any): void {
    if (this.errorHandler) {
      this.errorHandler(error);
    } else {
      console.error('[NotificationEventBus] Error handler not registered:', error);
    }
  }
}

export const Notification = new NotificationEventBus();
