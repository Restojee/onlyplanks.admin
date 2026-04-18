import { CommentEndpoints, CommentUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import { inject, injectable } from 'inversify';
import { HttpHandlerInjectKey } from '@common/http/constants';
import {
  CollectCommentRequest,
  CollectCommentResponse,
  CollectCommentPagedRequest,
  CollectCommentPagedResponse,
  CreateCommentRequest,
  CreateCommentAdminRequest,
  CreateCommentAdminResponse,
  UpdateCommentRequest,
  UpdateCommentAdminRequest,
  UpdateCommentAdminResponse,
  DeleteCommentRequest,
  DeleteCommentBulkRequest,
  DeleteCommentBulkResponse,
} from './models';

@injectable()
class CommentApi {
  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(request: CollectCommentRequest): Promise<CollectCommentResponse> {
    return this.http.get({
      url: CommentUrls[CommentEndpoints.Collect],
      params: request,
    });
  }

  public collectPaged(request: CollectCommentPagedRequest): Promise<CollectCommentPagedResponse> {
    return this.http.get({
      url: CommentUrls[CommentEndpoints.CollectPaged],
      params: request,
    });
  }

  public create(request: CreateCommentRequest): Promise<void> {
    return this.http.post({
      url: CommentUrls[CommentEndpoints.Create],
      params: request,
    });
  }

  public createAdmin(request: CreateCommentAdminRequest): Promise<CreateCommentAdminResponse> {
    return this.http.post({
      url: CommentUrls[CommentEndpoints.CreateAdmin],
      params: request,
    });
  }

  public update(request: UpdateCommentRequest): Promise<void> {
    return this.http.put({
      url: CommentUrls[CommentEndpoints.Update],
      params: request,
    });
  }

  public updateAdmin(request: UpdateCommentAdminRequest): Promise<UpdateCommentAdminResponse> {
    return this.http.put({
      url: CommentUrls[CommentEndpoints.UpdateAdmin],
      params: request,
    });
  }
  public deleteBulk(request: DeleteCommentBulkRequest): Promise<void> {
    return this.http.post({
      url: CommentUrls[CommentEndpoints.DeleteBulk],
      params: request,
    });
  }
}

export default CommentApi;
