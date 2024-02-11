import { IUserGetDto } from '../DTOs/user/IUserGetDto';
import { UserOAuthPostDto } from '../DTOs/user/UserOAuthPostDto';
import { UserPostDto } from '../DTOs/user/UserPostDto';
import { Role } from '../enums/Role';
import { IUser, IsUserPostDto } from '../models/User';

export function MapToIUser(user: UserPostDto | UserOAuthPostDto): IUser {
  return {
    email: user.email,
    name: user.name,
    password: IsUserPostDto(user) ? user.password : null,
    role: user.role,
    surname: user.surname,
    isOAuth: user.isOAuth,
    OAuthId: user.OAuthId,
    OAuthProvider: user.OAuthProvider,
  } as IUser;
}

export function MapToIUserGetDto(user: IUser | null): IUserGetDto | null {
  if (user === null) {
    return null;
  }

  return {
    email: user.email,
    id: user.id,
    name: user.name,
    role: Role[user.role],
    surname: user.surname,
  };
}