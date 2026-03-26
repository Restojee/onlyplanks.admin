import { inject, injectable } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import SystemSettingsApi from '@common/api/systemSettings/api';
import { SystemSettingsApiInjectKey } from '@common/api/systemSettings/constants';
import type { SystemSettings, UpdateSystemSettingsRequest } from '@common/api/systemSettings/models';

@injectable()
export class SystemSettingsService {

  constructor(
    @inject(SystemSettingsApiInjectKey) private api: SystemSettingsApi
  ) {}

  @AsyncAction()
  public async getSettings(): Promise<SystemSettings> {
    return await this.api.getSettings();
  }

  @AsyncAction()
  public async updateSettings(request: UpdateSystemSettingsRequest): Promise<SystemSettings> {
    return await this.api.updateSettings(request);
  }
}

export default SystemSettingsService;
