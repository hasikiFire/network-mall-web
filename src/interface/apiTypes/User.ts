export interface User {
  id?: number;
  uuid?: number;
  name?: string;
  email?: string;
  passwordHash?: string;
  salt?: string;
  status?: number;
  inviterUserId?: number;
  inviteCode?: string;
  createdAt?: string;
  updatedAt?: string;
  deleted?: number;
}
