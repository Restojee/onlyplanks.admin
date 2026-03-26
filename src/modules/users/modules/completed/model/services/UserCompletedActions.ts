import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { UserCompletedDataAccess } from './UserCompletedDataAccess';
import { UserCompletedDataAccessInjectKey } from '../common/constants';
import { CollectCompletedRequest } from '@common/api/completed/models';

@injectable()
export class UserCompletedActions {
  constructor(
    @inject(UserCompletedDataAccessInjectKey) private readonly dataAccess: UserCompletedDataAccess,
  ) {}

  @AsyncAction()
  public async loadCompleted(userId: number): Promise<void> {
    const request: CollectCompletedRequest = { userId };
    await this.dataAccess.collect(request);
  }
}
