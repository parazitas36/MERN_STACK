import { Request, Response, Router } from 'express';
import { GetAllItems, GetAllItemsByCategory, GetItemById, PostItem } from '../logic/ItemsLogic';
import { ItemEndpoints } from './routeEnums/ItemEndpoints';
import { StatusCodes } from '../enums/StatusCodes';
import { RequestsHandler } from '../utils/general/RequestsHandler';
import { IItemPostDto } from '../DTOs/item/ItemPostDto';

const router = Router();

/**
 * GET
 * Gets all items.
 */
router.get(ItemEndpoints.Base, (req: Request, res: Response) => {
    const callback = async () => {
        const items = await GetAllItems();
        return { status: StatusCodes.OK, data: items };
    }

    RequestsHandler({ req, res, callback });
});

/**
 * GET
 * Request parameters: {category}
 * Gets all items by category.
 */
router.get(ItemEndpoints.Category, (req: Request, res: Response) => {
    const callback = async () => {
        const category = Number(req.params['category']);
        const items = await GetAllItemsByCategory(category);
        return { status: StatusCodes.OK, data: items };
    }

    RequestsHandler({ req, res, callback });
});

/**
 * GET
 * Request parameters: {id}
 * Get item by id.
 */
router.get(ItemEndpoints.ById, (req: Request, res: Response) => {
    const callback = async () => {
        const id = req.params['id'];
        const item = await GetItemById(id);

        return item ? { status: StatusCodes.OK, data: item }
            : { status: StatusCodes.NOT_FOUND };
    }

    RequestsHandler({ req, res, callback });
});

/**
 * POST
 * Request body: IItemPostDto
 * Creates item.
 */
router.post(ItemEndpoints.Base, (req: Request, res: Response) => {
    const callback = async () => {
        const itemDto: IItemPostDto = req.body;
        const didCreateItem = await PostItem(itemDto);
        return {
            status: didCreateItem ? StatusCodes.CREATED : StatusCodes.CONFLICT,
        }
    }

    RequestsHandler({ req, res, callback });
});

export const ItemsController = router;