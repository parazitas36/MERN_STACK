import { IUserPostDto, UserPostDto } from '../DTOs/user/UserPostDto';
import { IUserLoginDto } from '../DTOs/user/IUserLoginDto';
import { User, IUser, IsUserPostDto } from '../models/User';
import bcrypt from 'bcrypt';
import { MapToIUser, MapToIUserGetDto } from '../mappers/UserMappers';
import { IUserGetDto } from '../DTOs/user/IUserGetDto';
import { IUserOAuthPostDto, UserOAuthPostDto } from '../DTOs/user/UserOAuthPostDto';

const SALT_ROUNDS = 5; // TODO: Move to config.

/**
 * Creates new user.
 * @param userDto Registration info.
 * @returns Outcome if registration was successful or not.
 */
export async function RegisterUser(userDto: IUserPostDto): Promise<boolean> {
  return await CreateUser(new UserPostDto(userDto))
}

/**
 * Creates new OAtuh user.
 * @param userDto Registration info.
 * @returns Outcome if registration was successful or not.
 */
export async function RegisterOAuthUser(userDto: IUserOAuthPostDto): Promise<boolean> {
  return await CreateUser(new UserOAuthPostDto(userDto))
}

/**
 * Logins user.
 * @param userDto User's credentials.
 * @returns User's data if login is successful.
 */
export async function LoginUser(userDto: IUserLoginDto): Promise<IUserGetDto | null> {
  const user = await User.findOne({ email: userDto.email }).exec();
  return user === null ? null
    : MapToIUserGetDto(user);
}

export async function FindUserById(userId: string): Promise<IUser | null> {
  return await User.findById(userId).exec();
}

export async function FindUserByOAuthId(userOAuthId: string): Promise<IUser | null> {
  return await User.findOne({ OAuthId: userOAuthId }).exec();
}

async function CreateUser(user: UserPostDto | UserOAuthPostDto): Promise<boolean> {
  const existingUser = IsUserPostDto(user)
    ? await User.findOne({ email: user.email }).exec()
    : await User.findOne({ OAuthId: user.OAuthId }).exec();

  if (existingUser !== null) {
    return false;
  }

  await User.create(await PrepareUserDataForCreation(user));
  return true;
}

async function PrepareUserDataForCreation(user: UserPostDto | UserOAuthPostDto): Promise<IUser> {
  if (IsUserPostDto(user)) {
    user.password = await bcrypt.hash(user.password!, SALT_ROUNDS);
  }

  return MapToIUser(user);
}