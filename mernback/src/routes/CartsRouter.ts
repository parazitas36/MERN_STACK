import { Router } from 'express';
import { GetUserCart, PostCart, PutCart } from '../logic/CartLogic';
import { CartEndpoints } from './routeEnums/CartEndpoints';

const router = Router();

router.put(CartEndpoints.ById, PutCart);
router.get(CartEndpoints.Base, GetUserCart);
router.post(CartEndpoints.Base, PostCart);

export const CartsRouter = router;