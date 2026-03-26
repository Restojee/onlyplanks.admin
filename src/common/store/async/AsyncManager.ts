import Async from '@common/store/async/Async';

class AsyncManager<S> {
  private readonly _store: S;
  public static DefaultInjectKey = 'AsyncManager';

  constructor(store: S) {
    this._store = store;
  }

  public call<Req>(async: Async<Req, S>, req: Req) {
    return async.call(this)(req);
  }

  public getStore(): S {
    return this._store;
  }
}

export default AsyncManager;