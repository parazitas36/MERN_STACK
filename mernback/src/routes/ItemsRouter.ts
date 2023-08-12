import { Router } from 'express';
import { GetAllItems, GetAllItemsByCategory, GetItemById, PostItem } from '../logic/ItemsLogic';
import { ItemEndpoints } from './routeEnums/ItemEndpoints';

const router = Router();

router.get(ItemEndpoints.Base, GetAllItems);
router.get(ItemEndpoints.Category, GetAllItemsByCategory);
router.get(ItemEndpoints.ById, GetItemById);

router.post(ItemEndpoints.Base, PostItem);

export const ItemsRouter = router;