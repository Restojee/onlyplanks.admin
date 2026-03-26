export class LoginRequest { userName: string; password: string; }
export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {};
  policies: string[];
  otherPolicies: string[];
}
