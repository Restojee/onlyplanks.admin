import { inject, injectable } from 'inversify';
import { HttpHandler } from '@common/http/HttpHandler';
import { HttpHandlerInjectKey } from '@common/http/constants';
import { LevelTagEndpoints, LevelTagUrls } from './endpoints';
import type {
  LevelTagCollectArgs,
  LevelTagCollectResponse,
  LevelTagCreateArgs,
  LevelTagCreateResponse,
  LevelTagDeleteArgs,
  LevelTagDeleteResponse,
  LevelTagGetByIdArgs,
  LevelTagGetByIdResponse,
  LevelTagRemoveArgs,
  LevelTagRemoveResponse,
  LevelTagUpdateArgs,
  LevelTagUpdateResponse,
} from './types';

@injectable()
class LevelTagsApi {
  constructor(@inject(HttpHandlerInjectKey) private http: HttpHandler) {}

  public collect(args: LevelTagCollectArgs): Promise<LevelTagCollectResponse> {
    return this.http.get<LevelTagCollectArgs, LevelTagCollectResponse>({
      url: LevelTagUrls[LevelTagEndpoints.Collect],
      params: args,
    });
  }

  public remove(args: LevelTagRemoveArgs): Promise<LevelTagRemoveResponse> {
    return this.http.delete<LevelTagRemoveArgs, LevelTagRemoveResponse>({
      url: `${LevelTagUrls[LevelTagEndpoints.Remove]}/${args.id}`,
    });
  }

  public getById(args: LevelTagGetByIdArgs): Promise<LevelTagGetByIdResponse> {
    return this.http.get<undefined, LevelTagGetByIdResponse>({
      url: `${LevelTagUrls[LevelTagEndpoints.GetById]}/${args.id}`,
    });
  }

  public create(args: LevelTagCreateArgs): Promise<LevelTagCreateResponse> {
    return this.http.post<LevelTagCreateArgs, LevelTagCreateResponse>({
      url: LevelTagUrls[LevelTagEndpoints.Create],
      params: args,
    });
  }

  public update(args: LevelTagUpdateArgs): Promise<LevelTagUpdateResponse> {
    return this.http.put<LevelTagUpdateArgs, LevelTagUpdateResponse>({
      url: LevelTagUrls[LevelTagEndpoints.Update],
      params: args,
    });
  }

  public delete(args: LevelTagDeleteArgs): Promise<LevelTagDeleteResponse> {
    return this.http.delete<LevelTagDeleteArgs, LevelTagDeleteResponse>({
      url: `${LevelTagUrls[LevelTagEndpoints.Delete]}/${args.id}`,
    });
  }
}

export default LevelTagsApi;
