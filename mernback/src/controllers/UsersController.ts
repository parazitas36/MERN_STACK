import { Request, Response, Router } from 'express';
import { UserEndpoints } from './routeEnums/UserEndpoints';
import { LoginUser, RegisterUser } from '../logic/UsersLogic';
import { IUserLoginDto } from '../DTOs/user/IUserLoginDto';
import { StatusCodes } from '../enums/StatusCodes';
import { RequestsHandler } from '../utils/general/RequestsHandler';
import { IUserPostDto } from '../DTOs/user/UserPostDto';

const router = Router();

/**
 * POST
 * Request body: IUserPostDto
 * Creates user.
 */
router.post(UserEndpoints.Register, (req: Request, res: Response) => {
    const callback = async() => {
        const userDto: IUserPostDto = req.body;
        const didCreateUser = await RegisterUser(userDto);
        return {
            status: didCreateUser ? StatusCodes.CREATED : StatusCodes.CONFLICT,
        }
    }

    RequestsHandler({ req, res, callback });
});

/**
 * POST
 * Request body: IUserLoginDto
 * Logins user.
 */
router.post(UserEndpoints.Login, (req: Request, res: Response) => {
    const callback = async() => {
        const userDto: IUserLoginDto = req.body;
        const loggedInUser = await LoginUser(userDto);
        return loggedInUser ? { status: StatusCodes.OK, data: loggedInUser }
            : { status: StatusCodes.NOT_FOUND };
    }

    RequestsHandler({ req, res, callback });
});

export const UsersController = router;