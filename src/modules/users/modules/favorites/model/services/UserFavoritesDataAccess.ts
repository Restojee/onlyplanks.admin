import { inject, injectable } from 'inversify';
import { State } from '@common/hocs/withView/decorators';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';
import {
  CollectFavoriteRequest,
  CollectFavoriteResponse,
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  Favorite,
  DeleteFavoriteRequest,
  DeleteFavoriteResponse,
} from '@common/api/favorites/models';

@injectable()
export class UserFavoritesDataAccess {
  @State()
  public favoritesData: Favorite[] = [];

  constructor(@inject(FavoriteApiInjectKey) private readonly favoriteApi: FavoriteApi) {}
  
  public async collect(request: CollectFavoriteRequest): Promise<CollectFavoriteResponse> {
    const response = await this.favoriteApi.collect({ ...request, page: 1, size: 50 });
    this.favoritesData = response.records;
    return response;
  }

  public async create(request: CreateFavoriteRequest): Promise<CreateFavoriteResponse> {
    return this.favoriteApi.create(request);
  }

  public async delete(request: DeleteFavoriteRequest): Promise<DeleteFavoriteResponse> {
    return this.favoriteApi.delete(request);
  }
}
