export enum AuthEndpoints {
  Login = 'Login',
  AdminLogin = 'AdminLogin',
}

export const AuthUrls: Record<AuthEndpoints, string> = {
  [AuthEndpoints.Login]: 'auth/login',
  [AuthEndpoints.AdminLogin]: 'auth/admin/login',
};
