import { Request, Response, Router } from "express";
import { StatusCodes } from "../enums/StatusCodes";
import passport from "passport";
import { AuthEndpoints } from "./routeEnums/AuthEndpoints";
import { ResponseResult } from "../interfaces/ResponseResult";
import { RequestsHandler } from "../utils/general/RequestsHandler";

const router = Router();

router.get(AuthEndpoints.Login, (req: Request, res: Response) => {
    passport.authenticate('google', (err: any, user: any, info: any) => {
        console.log('err: ', err);
        console.log('user: ', user);
        console.log('info: ', info);
    })
    console.log('login user:', req.user);
    const responseData: ResponseResult<Express.User | null> = {
        status: req.user ? StatusCodes.OK : StatusCodes.Forbidden,
        data: req.user ?? null,
    }

    RequestsHandler({ req, res, callback: async() => responseData })
});

router.get(AuthEndpoints.Logout, (req: Request, res: Response) => {
    const responseData: ResponseResult<undefined> = {
        status: StatusCodes.OK,
    }

    req.logout(() => {});
    RequestsHandler({ req, res, callback: async() => responseData })
});

router.get(
    AuthEndpoints.GoogleCallback,
    passport.authenticate('google', {passReqToCallback: true}), 
    (req: Request, res: Response) => {
        res.redirect(process.env.CLIENT_URL as string);
    }
);

router.get(AuthEndpoints.Google, passport.authenticate('google', { scope: ['profile', 'email'] }));


export const OAuthController = router;