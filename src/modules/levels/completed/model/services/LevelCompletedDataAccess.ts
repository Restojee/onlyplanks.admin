import { inject, injectable } from 'inversify';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import {
  CollectCompletedRequest,
  CollectCompletedResponse,
  Completed,
  CreateCompletedRequest,
  CreateCompletedResponse,
  DeleteCompletedRequest, DeleteCompletedResponse, UpdateCompletedImageRequest,
  UpdateCompletedRequest,
  UpdateCompletedResponse,
} from '@common/api/completed/models';

@injectable()
export class LevelCompletedDataAccess {
  constructor(@inject(CompletedApiInjectKey) private readonly completedApi: CompletedApi) {}
  public async create(request: CreateCompletedRequest): Promise<CreateCompletedResponse> {
    return this.completedApi.create(request);
  }

  public async update(request: UpdateCompletedRequest): Promise<UpdateCompletedResponse> {
    return this.completedApi.update(request);
  }

  public async delete(request: DeleteCompletedRequest): Promise<DeleteCompletedResponse> {
    return this.completedApi.delete(request);
  }

  public async updateImage(request: UpdateCompletedImageRequest): Promise<UpdateCompletedResponse> {
    return this.completedApi.updateImage(request);
  }
}
