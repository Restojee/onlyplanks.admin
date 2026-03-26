import { inject, injectable } from 'inversify';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';
import {
  CreateFavoriteRequest,
  CreateFavoriteResponse,
  DeleteFavoriteRequest,
  DeleteFavoriteResponse,
} from '@common/api/favorites/models';

@injectable()
export class LevelFavoritesDataAccess {
  constructor(@inject(FavoriteApiInjectKey) private readonly favoriteApi: FavoriteApi) {}

  public async create(request: CreateFavoriteRequest): Promise<CreateFavoriteResponse> {
    return this.favoriteApi.create(request);
  }

  public async delete(request: DeleteFavoriteRequest): Promise<DeleteFavoriteResponse> {
    return this.favoriteApi.delete(request);
  }
}
