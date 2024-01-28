import { StatusCodes } from "../enums/StatusCodes";

export interface ResponseResult<T> {
    status: StatusCodes;
    data?: T | null;
}