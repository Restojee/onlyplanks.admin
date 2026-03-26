import { TipEndpoints, TipUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import {
  type TipCollectArgs,
  type TipCollectResponse,
  type TipCreateArgs,
  type TipCreateResponse,
  type TipRemoveArgs,
  type TipRemoveResponse,
  type TipUpdateArgs,
  type TipUpdateResponse,
} from './types';
import { inject, injectable } from 'inversify';
import { HttpHandlerInjectKey } from '@common/http/constants';

@injectable()
class TipsApi {

  public static GlobalInjectKey = 'TipsApiKey';

  constructor(@inject(HttpHandlerInjectKey) private http: HttpHandler) {}

  public collect(args?: TipCollectArgs): Promise<TipCollectResponse> {
    return this.http.get<TipCollectArgs, TipCollectResponse>({
      url: TipUrls[TipEndpoints.Collect],
      params: args,
    });
  }

  public create(args: TipCreateArgs): Promise<TipCreateResponse> {
    return this.http.post<TipCreateArgs, TipCreateResponse>({
      url: TipUrls[TipEndpoints.Create],
      params: args,
    });
  }

  public update(args: TipUpdateArgs): Promise<TipUpdateResponse> {
    return this.http.put<TipUpdateArgs, TipUpdateResponse>({
      url: TipUrls[TipEndpoints.Update],
      params: args,
    });
  }

  public remove(args: TipRemoveArgs): Promise<TipRemoveResponse> {
    return this.http.delete<TipRemoveArgs, TipRemoveResponse>({
      url: `${TipUrls[TipEndpoints.Remove]}/${args.tipId}`,
    });
  }
}

export default TipsApi;
