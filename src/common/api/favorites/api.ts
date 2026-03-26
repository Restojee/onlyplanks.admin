import { FavoriteEndpoints, FavoriteUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import { inject, injectable } from 'inversify';
import { HttpHandlerInjectKey } from '@common/http/constants';
import {
  CollectFavoriteRequest,
  CollectFavoriteResponse,
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  DeleteFavoriteRequest,
  DeleteFavoriteResponse,
  UpdateFavoriteRequest,
  UpdateFavoriteResponse,
} from '@common/api/favorites/models';

@injectable()
class FavoriteApi {
  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(request: CollectFavoriteRequest): Promise<CollectFavoriteResponse> {
    return this.http.get({
      url: FavoriteUrls[FavoriteEndpoints.Collect],
      params: request,
    });
  }

  public create(request: CreateFavoriteRequest): Promise<CreateFavoriteResponse> {
    return this.http.post({
      url: FavoriteUrls[FavoriteEndpoints.Create],
      params: request,
    });
  }

  public delete(request: DeleteFavoriteRequest): Promise<DeleteFavoriteResponse> {
    return this.http.delete({
      url: FavoriteUrls[FavoriteEndpoints.Delete],
      params: request,
    });
  }

  public update(request: UpdateFavoriteRequest): Promise<UpdateFavoriteResponse> {
    return this.http.put({
      url: FavoriteUrls[FavoriteEndpoints.Update],
      params: request,
    });
  }
}

export default FavoriteApi;
