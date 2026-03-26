import { SystemSettingsEndpoints, SystemSettingsUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";
import { inject, injectable } from "inversify";
import { HttpHandlerInjectKey } from "@common/http/constants";
import type { SystemSettings, UpdateSystemSettingsRequest } from './models';

@injectable()
class SystemSettingsApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public getSettings(): Promise<SystemSettings> {
    return this.http.get({
      url: SystemSettingsUrls[SystemSettingsEndpoints.Get],
    });
  }

  public updateSettings(request: UpdateSystemSettingsRequest): Promise<SystemSettings> {
    return this.http.put({
      url: SystemSettingsUrls[SystemSettingsEndpoints.Update],
      params: request,
    });
  }
}

export default SystemSettingsApi;
