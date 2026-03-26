import { CompletedEndpoints, CompletedUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import { inject, injectable } from 'inversify';
import { HttpHandlerInjectKey } from '@common/http/constants';
import {
  CollectCompletedRequest,
  CollectCompletedResponse,
  CreateCompletedRequest,
  CreateCompletedResponse,
  UpdateCompletedRequest,
  UpdateCompletedResponse,
  DeleteCompletedRequest,
  DeleteCompletedResponse, UpdateCompletedImageRequest,
} from './models';

@injectable()
class CompletedApi {
  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(request: CollectCompletedRequest): Promise<CollectCompletedResponse> {
    return this.http.get({
      url: CompletedUrls[CompletedEndpoints.Collect],
      params: request,
    });
  }

  public getByLevelId(levelId: number): Promise<CollectCompletedResponse> {
    return this.http.get({
      url: CompletedUrls[CompletedEndpoints.ByLevelId],
      params: { levelId, page: 1, size: 50 },
    });
  }

  public create(request: CreateCompletedRequest): Promise<CreateCompletedResponse> {
    return this.http.post({
      url: CompletedUrls[CompletedEndpoints.Create],
      params: request,
    });
  }

  public update(request: UpdateCompletedRequest): Promise<UpdateCompletedResponse> {

    return this.http.put({
      url: CompletedUrls[CompletedEndpoints.Update],
      params: request,
    });
  }

  public updateImage(request: UpdateCompletedImageRequest): Promise<UpdateCompletedResponse> {
    return this.http.post({
      url: CompletedUrls[CompletedEndpoints.UpdateImage],
      params: { completedId: request.id },
      file: request.image
    });
  }

  public delete(request: DeleteCompletedRequest): Promise<DeleteCompletedResponse> {
    return this.http.delete({
      url: CompletedUrls[CompletedEndpoints.Delete],
      params: request,
    });
  }
}

export default CompletedApi;
