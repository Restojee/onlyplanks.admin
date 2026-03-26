export interface InviteUserInfo {
  id: number;
  username: string;
  email?: string ;
  avatar?: string ;
}

export interface InviteData {
  id: number;
  token: string;
  email: string;
  expirationDate: string;
  isUsed: boolean;
  createdUtcDate: string;
  modifiedUtcDate: string;

  createdByUser?: InviteUserInfo;
  registeredUser?: InviteUserInfo;
}

export interface InviteFormData {
  email: string;
}
