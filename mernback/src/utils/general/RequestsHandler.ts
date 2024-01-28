import { Request, Response } from "express"
import { StatusCodes } from "../../enums/StatusCodes";
import { ResponseResult } from "../../interfaces/ResponseResult";

interface Props<T> {
    req: Request;
    res: Response;
    callback: () => Promise<ResponseResult<T>>
}

export async function RequestsHandler<T>({ req, res, callback }: Props<T>) {
    try {
        console.log(`${req.method} ${req.baseUrl}${req.url} ${req.ip}`); 
        const result = await callback();
        SendResponse(result, res);
    } catch (error) {
        HandleError(error as Error, res);
    }
}

function SendResponse(result: ResponseResult<any>, res: Response) {
    if (result.data) {
        res.status(result.status).send(result.data);
    } else {
        res.status(result.status).send();
    }
}

function HandleError(error: Error, res: Response): void {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
}