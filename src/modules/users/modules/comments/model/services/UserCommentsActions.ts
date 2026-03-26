import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { UserCommentsDataAccess } from './UserCommentsDataAccess';
import { UserCommentsDataAccessInjectKey } from '../common/constants';
import { CollectCommentRequest } from '@common/api/comments/models';

@injectable()
export class UserCommentsActions {
  constructor(
    @inject(UserCommentsDataAccessInjectKey) private readonly dataAccess: UserCommentsDataAccess,
  ) {}

  @AsyncAction()
  public async loadByUserId(userId: number): Promise<void> {
    const request: CollectCommentRequest = { userId };
    await this.dataAccess.collect(request);
  }
}
