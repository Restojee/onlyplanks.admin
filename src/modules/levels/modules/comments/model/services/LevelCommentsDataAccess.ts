import { inject, injectable } from 'inversify';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';
import {
  CreateCommentRequest,
  UpdateCommentRequest,
  DeleteCommentRequest,
} from '@common/api/comments/models';

@injectable()
export class LevelCommentsDataAccess {
  constructor(@inject(CommentApiInjectKey) private readonly commentApi: CommentApi) {}

  public async create(request: CreateCommentRequest): Promise<void> {
    return this.commentApi.create(request);
  }

  public async update(request: UpdateCommentRequest): Promise<void> {
    return this.commentApi.update(request);
  }

  public async delete(levelCommentIds: number[]): Promise<void> {
    for (const id of levelCommentIds) {
      await this.commentApi.delete({ levelCommentId: id });
    }
  }
}
