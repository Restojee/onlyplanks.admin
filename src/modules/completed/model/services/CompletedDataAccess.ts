import { inject, injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import type {
  CollectCompletedRequest,
  CollectCompletedResponse,
  Completed,
  CreateCompletedRequest,
  DeleteCompletedRequest,
  UpdateCompletedImageRequest,
  UpdateCompletedRequest,
} from '@common/api/completed/models';

@injectable()
export class CompletedDataAccess {
  @State()
  private readonly _entityManager: EntityManager<Completed>;

  @State()
  public filterSearchText: string = '';

  @State()
  public filterLevelId?: number;

  @State()
  public filterUserId?: number;

  constructor(@inject(CompletedApiInjectKey) private readonly completedApi: CompletedApi) {
    this._entityManager = new EntityManager<Completed>({
      getRowId: (row) => row.id,
    });
  }

  @Computed()
  public get entityManager(): EntityManager<Completed> {
    return this._entityManager;
  }

  @Action()
  public setAll(rows: Completed[]): void {
    this._entityManager.setAll(rows);
  }

  @Action()
  public create(row: Completed): void {
    this._entityManager.create(row);
  }

  @Action()
  public update(id: number, updates: Partial<Completed>): void {
    this._entityManager.update(id, updates);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
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

  public async collect(request: CollectCompletedRequest): Promise<CollectCompletedResponse> {
    return this.completedApi.collect(request);
  }

  public async createCompleted(request: CreateCompletedRequest): Promise<Completed> {
    return this.completedApi.create(request);
  }

  public async updateCompleted(request: UpdateCompletedRequest): Promise<void> {
    await this.completedApi.update(request);
  }

  public async updateCompletedImage(request: UpdateCompletedImageRequest): Promise<void> {
    await this.completedApi.updateImage(request);
  }

  public async deleteCompleted(request: DeleteCompletedRequest): Promise<void> {
    await this.completedApi.delete(request);
  }
}

export default CompletedDataAccess;
