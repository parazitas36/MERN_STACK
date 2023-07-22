import { Request, Response } from 'express';
import { IUserPostDto, UserPostDto } from '../DTOs/user/UserPostDto';
import { IUserLoginDto } from '../DTOs/user/IUserLoginDto';
import { User, IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { MapToIUser, MapToIUserGetDto } from '../mappers/UserMappers';

export async function RegisterUser(req: Request, res: Response): Promise<void> {
  const userDto: IUserPostDto = req.body;
  await TryCreateUser(userDto, res);
}

export async function LoginUser(req: Request, res: Response): Promise<void> {
  const userDto: IUserLoginDto = req.body;
  const user = await User.findOne({ email: userDto.email }).exec();

  if (user === null) {
    res.send(404).send();
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(userDto.password, user.password);
  MakeLoginResponse(isPasswordCorrect, user, res);
}

async function TryCreateUser(userDto: IUserPostDto, res: Response): Promise<void> {
  try {
    await CreateUser(new UserPostDto(userDto), res);
  } catch (error) {
    HandleCreateUserError(error as Error, res);
  }
}

async function CreateUser(user: UserPostDto, res: Response): Promise<void> {
  const existingUser = await User.findOne({ email: user.email }).exec();

  if (existingUser !== null) {
    res.status(409).send();
    return;
  }

  await User.create(await PrepareUserDataForCreation(user));
  res.status(201).send();
}

function HandleCreateUserError(error: Error, res: Response): void {
  console.log(error.message);
  res.status(409).send();
}

async function PrepareUserDataForCreation(user: UserPostDto): Promise<IUser> {
  user.password = await bcrypt.hash(user.password, 5);
  return MapToIUser(user);
}

function MakeLoginResponse(isPasswordCorrect: boolean, user: IUser, res: Response): void {
  if (isPasswordCorrect) {
    res.status(200).send(MapToIUserGetDto(user));
    return;
  }
  res.status(404).send();
}