import { Request, Response, Router } from 'express';
import { RequestsHandler } from '../utils/general/RequestsHandler';
import { CartEndpoints } from './routeEnums/CartEndpoints';
import { PutCart, GetUserCart, PostCart } from '../logic/CartLogic';
import { ICartPutDto } from '../DTOs/cart/CartPutDto';
import { StatusCodes } from '../enums/StatusCodes';
import { ICartPostDto } from '../DTOs/cart/CartPostDto';

const router = Router();

/**
 * PUT
 * Request parameters: {id}
 * Request body: ICartPutDto
 * Updates cart.
 */
router.put(CartEndpoints.ById, (req: Request, res: Response) => {
	const callback = async () => {
		const cartDto: ICartPutDto = req.body;
		cartDto.id = req.params['id'];
		const didUpdateCart = await PutCart(cartDto);

		return {
			status: didUpdateCart ? StatusCodes.NO_CONTENT : StatusCodes.CONFLICT,
		};
	};

	RequestsHandler({ res, req, callback });
});

/**
 * GET
 * Gets user cart.
 * TODO: Take USER_ID from token when auth will be implemented.
 */
router.get(CartEndpoints.Base, (req: Request, res: Response) => {
	const callback = async () => {
		const cart = await GetUserCart();
		return { 
			status: StatusCodes.OK, 
			data: cart,
		};
	};

	RequestsHandler({ res, req, callback });
});

/**
 * POST
 * Request body: ICartPostDto
 * Creates cart.
 */
router.post(CartEndpoints.Base, (req: Request, res: Response) => {
	const callback = async () => {
		const cartDto: ICartPostDto = req.body;
		const didCreateCart = await PostCart(cartDto);

		return {
			status: didCreateCart ? StatusCodes.CREATED : StatusCodes.CONFLICT,
		};
	};

	RequestsHandler({ res, req, callback })
});

export const CartsController = router;