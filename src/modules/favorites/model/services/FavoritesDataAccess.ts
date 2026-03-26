import { inject, injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';
import type { CollectFavoriteRequest, CollectFavoriteResponse, UpdateFavoriteRequest, CreateFavoriteRequest, CreateFavoriteResponse, Favorite } from '@common/api/favorites/models';

@injectable()
export class FavoritesDataAccess {
  @State()
  private readonly _entityManager: EntityManager<Favorite>;

  @State()
  public filterSearchText: string = '';

  @State()
  public filterLevelId?: number;

  @State()
  public filterUserId?: number;

  constructor(@inject(FavoriteApiInjectKey) private readonly api: FavoriteApi) {
    this._entityManager = new EntityManager<Favorite>({ getRowId: (row) => row.id });
  }

  @Computed()
  public get entityManager(): EntityManager<Favorite> {
    return this._entityManager;
  }

  @Action()
  public setAll(rows: Favorite[]): void {
    this._entityManager.setAll(rows);
  }

  @Action()
  public setFilterSearchText(text: string): void {
    this.filterSearchText = text;
  }

  @Action()
  public setFilterLevelId(levelId?: number): void {
    this.filterLevelId = levelId;
  }

  @Action()
  public setFilterUserId(userId?: number): void {
    this.filterUserId = userId;
  }

  public async collect(request: CollectFavoriteRequest): Promise<CollectFavoriteResponse> {
    return this.api.collect(request);
  }

  public async create(request: CreateFavoriteRequest): Promise<CreateFavoriteResponse> {
    return this.api.create(request);
  }

  public async update(request: UpdateFavoriteRequest): Promise<Favorite> {
    return this.api.update(request);
  }

  public async delete(levelFavoriteIds: number[]): Promise<void> {
    await this.api.delete({ LevelFavoriteIds: levelFavoriteIds });
  }
}

export default FavoritesDataAccess;
