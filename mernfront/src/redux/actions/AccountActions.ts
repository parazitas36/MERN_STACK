import { IUserGetDto } from '../../data/DTOs/user/IUserGetDto';
import { ActionsEnum } from './ActionsEnum';
import { createAction } from '@reduxjs/toolkit';

export const LoggedIn = createAction<IUserGetDto>(ActionsEnum.LoggedIn.toString());
export const LoggedOut = createAction(ActionsEnum.LoggedOut.toString());