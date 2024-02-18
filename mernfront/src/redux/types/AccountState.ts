import { IUserGetDto } from "../../data/DTOs/user/IUserGetDto";

export interface AccountState {
    accountInfo: IUserGetDto | null;
}