import { inject, injectable } from 'inversify';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';
import { Comment } from '@common/api/comments/models';

@injectable()
export class LevelCommentsActions {
  constructor(
    @inject(CommentApiInjectKey) private readonly commentApi: CommentApi,
  ) {}

  public async getComments(levelId: number): Promise<Comment[]> {
    return await this.commentApi.collect({ levelId });
  }
}
