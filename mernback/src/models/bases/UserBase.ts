import { Role } from '../../enums/Role';

export interface UserBase {
  email: string;
  name: string;
  password?: string;
  role: Role;
  surname: string;
  isOAuth?: Boolean;
  OAuthProvider?: string;
  OAuthId?: string;
}