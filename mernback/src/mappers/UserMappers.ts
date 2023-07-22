import { IUserGetDto } from '../DTOs/user/IUserGetDto';
import { UserPostDto } from '../DTOs/user/UserPostDto';
import { Role } from '../enums/Role';
import { IUser } from '../models/User';

export function MapToIUser(user: UserPostDto): IUser {
  return {
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    surname: user.email,
  } as IUser;
}

export function MapToIUserGetDto(user: IUser): IUserGetDto {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    role: Role[user.role],
    surname: user.surname,
  };
}