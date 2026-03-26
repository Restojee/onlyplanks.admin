import { inject, injectable } from 'inversify';
import { State } from '@common/hocs/withView/decorators';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import {
  CollectCompletedRequest,
  CollectCompletedResponse,
  Completed,
  CreateCompletedRequest,
  CreateCompletedResponse,
  DeleteCompletedRequest,
  DeleteCompletedResponse,
  UpdateCompletedImageRequest,
  UpdateCompletedRequest,
  UpdateCompletedResponse,
} from '@common/api/completed/models';

@injectable()
export class UserCompletedDataAccess {
  @State()
  public completedData: Completed[] = [];

  @State()
  public totalItems: number = 0;

  @State()
  public currentPage: number = 1;

  @State()
  public pageSize: number = 10;

  constructor(@inject(CompletedApiInjectKey) private readonly completedApi: CompletedApi) {}
  
  public async collect(request: CollectCompletedRequest) {
    const resp = await this.completedApi.collect({ ...request, page: 1, size: 50 });
    this.completedData = resp.records as any;
  }

  public async create(request: CreateCompletedRequest) {
    return this.completedApi.create(request);
  }

  public async update(request: UpdateCompletedRequest) {
    return this.completedApi.update(request);
  }

  public async delete(request: DeleteCompletedRequest) {
    return this.completedApi.delete(request);
  }

  public async updateImage(request: UpdateCompletedImageRequest) {
    return this.completedApi.updateImage(request);
  }
}
