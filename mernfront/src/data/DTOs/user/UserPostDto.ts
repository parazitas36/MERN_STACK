import { Role } from '../../enums/Role';

export interface IUserPostDto {
  email: string;
  name: string;
  password: string;
  role: Role;
  surname: string;
  repeatPassword: string;
}
