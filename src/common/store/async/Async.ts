import { AsyncActionFabric } from '@common/store/async/types';
import AsyncManager from '@common/store/async/AsyncManager';


class Async<Req, S> {
  private _asyncAction: AsyncActionFabric<Req, S>

  public create(handler: AsyncActionFabric<Req, S>): this {
    this._asyncAction = handler;
    return this;
  }

  public call(asyncManager: AsyncManager<S>): (req: Req) => void {
    return (req: Req) => this._asyncAction(req, asyncManager.getStore(), {})
  }
}

export default Async;
