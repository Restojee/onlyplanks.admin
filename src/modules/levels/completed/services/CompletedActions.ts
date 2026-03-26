import { inject, injectable } from 'inversify';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import {
  CreateCompletedRequest,
  CreateCompletedResponse,
  UpdateCompletedRequest,
  UpdateCompletedResponse,
  DeleteCompletedRequest,
  DeleteCompletedResponse,
  CollectCompletedRequest,
  CollectCompletedResponse,
  Completed,
} from '@common/api/completed/models';

@injectable()
class CompletedActions {
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

  public async collect(request: CollectCompletedRequest): Promise<CollectCompletedResponse> {
    return this.completedApi.collect(request);
  }
}

export default CompletedActions;
