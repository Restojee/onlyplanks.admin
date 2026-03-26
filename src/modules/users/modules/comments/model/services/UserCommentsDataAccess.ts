import { inject, injectable } from 'inversify';
import { State } from '@common/hocs/withView/decorators';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';
import {
  CollectCommentRequest,
  CollectCommentResponse,
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
  DeleteCommentRequest,
} from '@common/api/comments/models';

@injectable()
export class UserCommentsDataAccess {
  @State()
  public commentsData: Comment[] = [];

  constructor(@inject(CommentApiInjectKey) private readonly commentApi: CommentApi) {}
  
  public async collect(request: CollectCommentRequest): Promise<CollectCommentResponse> {
    const response = await this.commentApi.collect(request);
    this.commentsData = response;
    return response;
  }

  public async create(request: CreateCommentRequest): Promise<void> {
    return this.commentApi.create(request);
  }

  public async update(request: UpdateCommentRequest): Promise<void> {
    return this.commentApi.update(request);
  }

  public async delete(request: DeleteCommentRequest): Promise<void> {
    return this.commentApi.delete(request);
  }
}
