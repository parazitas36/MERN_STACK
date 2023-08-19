import { Router } from 'express';
import { UserEndpoints } from './routeEnums/UserEndpoints';
import { LoginUser, RegisterUser } from '../logic/UsersLogic';

const router = Router();

router.post(UserEndpoints.Register, RegisterUser);
router.post(UserEndpoints.Login, LoginUser);

export const UsersRouter = router;