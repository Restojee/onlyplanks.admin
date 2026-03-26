import { InviteEndpoints, InviteUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";
import { inject, injectable } from "inversify";
import { HttpHandlerInjectKey } from "@common/http/constants";
import {
  CreateInviteRequest,
  CreateInviteResponse,
  Invite,
  RevokeInvitesRequest,
  RevokeInvitesResponse,
} from '@common/api/invites/models';

@injectable()
class InviteApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(): Promise<Invite[]> {
    return this.http.get({
      url: InviteUrls[InviteEndpoints.Collect],
    })
  }

  public createInvite(request: CreateInviteRequest): Promise<CreateInviteResponse> {
    return this.http.post({
      url: InviteUrls[InviteEndpoints.Create],
      params: request,
    })
  }

  public revokeInvites(request: RevokeInvitesRequest): Promise<RevokeInvitesResponse> {
    return this.http.delete({
      url: InviteUrls[InviteEndpoints.Revoke],
      params: request,
    })
  }
}

export default InviteApi;
