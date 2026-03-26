import { inject, injectable } from 'inversify';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';

@injectable()
class CompletedDataAccess {
  constructor(@inject(CompletedApiInjectKey) private readonly completedApi: CompletedApi) {}
}

export default CompletedDataAccess;
