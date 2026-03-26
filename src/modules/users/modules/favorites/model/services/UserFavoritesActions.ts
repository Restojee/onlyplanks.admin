import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { UserFavoritesDataAccess } from './UserFavoritesDataAccess';
import { UserFavoritesDataAccessInjectKey } from '../common/constants';
import { CollectFavoriteRequest } from '@common/api/favorites/models';

@injectable()
export class UserFavoritesActions {
  constructor(
    @inject(UserFavoritesDataAccessInjectKey) private readonly dataAccess: UserFavoritesDataAccess,
  ) {}

  @AsyncAction()
  public async loadFavorites(userId: number): Promise<void> {
    const request: CollectFavoriteRequest = { userId };
    await this.dataAccess.collect(request);
  }
}
