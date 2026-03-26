import { injectable } from 'inversify';
import Action from '@common/hocs/withView/decorators/Action';
import Computed from '@common/hocs/withView/decorators/Computed';
import State from '@common/hocs/withView/decorators/State';

@injectable()
export class AsyncService {
  @State()
  private _activeOperationsCount: number = 0;

  @State()
  private _showLoader: boolean = false;

  private _delayMs: number = 500;
  private _delayTimer: NodeJS.Timeout  = null;

  @Computed()
  get isLoading(): boolean {
    return this._showLoader;
  }

  @Computed()
  get hasActiveOperations(): boolean {
    return this._activeOperationsCount > 0;
  }

  @Computed()
  get activeOperationsCount(): number {
    return this._activeOperationsCount;
  }

  @Action()
  setDelayMs(delayMs: number): void {
    this._delayMs = delayMs;
  }

  @Action()
  startAsyncOperation(): void {
    this._activeOperationsCount++;

    if (this._activeOperationsCount === 1 && !this._delayTimer) {
      this._delayTimer = setTimeout(() => {
        if (this._activeOperationsCount > 0) {
          this._showLoader = true;
        }
        this._delayTimer = null;
      }, this._delayMs);
    }
  }

  @Action()
  endAsyncOperation(): void {
    if (this._activeOperationsCount > 0) {
      this._activeOperationsCount--;
    }

    if (this._activeOperationsCount === 0) {
      if (this._delayTimer) {
        clearTimeout(this._delayTimer);
        this._delayTimer = null;
      }
      this._showLoader = false;
    }
  }

  @Action()
  reset(): void {
    this._activeOperationsCount = 0;
    this._showLoader = false;
    if (this._delayTimer) {
      clearTimeout(this._delayTimer);
      this._delayTimer = null;
    }
  }
}
