import { ICartPostDto } from '../DTOs/cart/CartPostDto';
import { Cart, ICart } from '../models/Cart';
import { ICartItemGetDto } from '../DTOs/cart/CartItemGetDto';
import { IItem } from '../models/Item';
import { FindUserById } from './UsersLogic';
import { FindItemsByIds } from './ItemsLogic';
import { IUser } from '../models/User';
import { MapItemsAndUserToICart } from '../mappers/CartMappers';
import { ICartPutDto } from '../DTOs/cart/CartPutDto';
import { GetObjectAsNullable } from '../utils/general/ObjectsHelper';

const USER_ID = '64bc314402e89eccce1cda25';

export async function GetUserCart(): Promise<ICart | null> {
	const user = await FindUserById(USER_ID);
	return await Cart.findOne({ user: user?._id, isOrdered: false });
}

/**
 * Updates cart in database.
 * @param cartDto Cart DTO.
 * @returns Outcome of cart update, if it was successful or not.
 */
export async function PutCart(cartDto: ICartPutDto): Promise<boolean> {
	const [user, items] = await FindUserAndItems(cartDto.cart);

	if (GetObjectAsNullable(user) === null) {
		return false;
	}

	await Cart.findOneAndReplace({ _id: cartDto.id, user: user?.id }, MapItemsAndUserToICart(items, cartDto.cart, user as IUser));
	return true;
}

/**
 * Creates cart in database.
 * @param cartDto Cart DTO.
 * @returns Outcome of cart creation, if it was successful or not.
 */
export async function PostCart(cartDto: ICartPostDto): Promise<boolean> {
	const [user, items] = await FindUserAndItems(cartDto.cart);

	if (!IsCartAndUserDataValid(user, items)) {
		return false;
	}

	await Cart.create(MapItemsAndUserToICart(items, cartDto.cart, user as IUser));
	return true;
}

async function FindUserAndItems(cartItems: ICartItemGetDto[]): Promise<[IUser | null, IItem[]]> {
	const user = await FindUserById(USER_ID);
	const items = await GetCartItems(cartItems);
	return [user, items];
}

async function GetCartItems(cartItems: ICartItemGetDto[]): Promise<IItem[]> {
	const itemIds: string[] = cartItems.map((cartItem) => cartItem.id);
	return await FindItemsByIds(itemIds);
}

function IsCartAndUserDataValid(user: IUser | null, items: IItem[]): boolean {
	return !!user && items.length > 0;
}