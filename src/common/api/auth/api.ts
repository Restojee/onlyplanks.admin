import { AuthEndpoints, AuthUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";
import { inject, injectable } from "inversify";
import { HttpHandlerInjectKey } from "@common/http/constants";
import { LoginRequest, LoginResponse } from '@common/api/auth/models';

@injectable()
class AuthApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public login(args: LoginRequest): Promise<LoginResponse> {
    return this.http.post<LoginRequest, LoginResponse>({
      url: AuthUrls[AuthEndpoints.Login],
      params: args,
    })
  }

  public adminLogin(args: LoginRequest): Promise<LoginResponse> {
    return this.http.post<LoginRequest, LoginResponse>({
      url: AuthUrls[AuthEndpoints.AdminLogin],
      params: args,
    })
  }
}

export default AuthApi;
