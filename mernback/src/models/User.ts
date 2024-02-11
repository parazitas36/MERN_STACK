import { Document, Schema, model } from 'mongoose';
import { UserBase } from './bases/UserBase';
import { UserPostDto } from '../DTOs/user/UserPostDto';
import { UserOAuthPostDto } from '../DTOs/user/UserOAuthPostDto';

export interface IUser extends Document, UserBase { }

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: Number, required: true },
  surname: { type: String, required: true },
  isOAuth: { type: Boolean, required: true, default: false },
  OAuthProvider: { type: String, required: false },
  OAuthId: { type: String, required: false },
});

export const User = model<IUser>('User', userSchema);

export function IsUserPostDto(user: UserPostDto | UserOAuthPostDto): user is UserPostDto {
  return user instanceof UserPostDto;
}