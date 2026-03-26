export interface Invite {
  id: number;
  token: string;
  email: string;
  expirationDate: string;
  isUsed: boolean;
  createdUtcDate: string;
  modifiedUtcDate: string;

  createdByUser?: {
    id: number;
    username: string;
    email?: string ;
    avatar?: string ;
  };

  registeredUser?: {
    id: number;
    username: string;
    email?: string ;
    avatar?: string ;
  };
}

export interface CreateInviteRequest {
  email: string;
}
export interface CreateInviteResponse extends Invite {}

export interface RevokeInvitesRequest {
  ids: number[];
}

export interface RevokeInvitesResponse {}
