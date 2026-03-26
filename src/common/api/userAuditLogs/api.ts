import { inject, injectable } from 'inversify';
import { HttpHandler } from '@common/http/HttpHandler';
import { HttpHandlerInjectKey } from '@common/http/constants';
import { UserAuditLogEndpoints, UserAuditLogUrls } from './endpoints';
import type { CollectUserAuditLogsRequest, CollectUserAuditLogsResponse } from './models';

@injectable()
class UserAuditLogsApi {
  constructor(@inject(HttpHandlerInjectKey) private http: HttpHandler) {}

  public collect(args: CollectUserAuditLogsRequest): Promise<CollectUserAuditLogsResponse> {
    return this.http.get<CollectUserAuditLogsRequest, CollectUserAuditLogsResponse>({
      url: UserAuditLogUrls[UserAuditLogEndpoints.Collect],
      params: args,
    });
  }
}

export default UserAuditLogsApi;
