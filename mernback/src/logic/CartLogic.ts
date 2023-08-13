import { Request, Response } from 'express';
import { ICartPostDto } from '../DTOs/cart/CartPostDto';
import { Cart } from '../models/Cart';
import { ICartItemGetDto } from '../DTOs/cart/CartItemGetDto';
import { IItem } from '../models/Item';
import { FindUserById } from './UsersLogic';
import { FindItemsByIds } from './ItemsLogic';
import { IUser } from '../models/User';
import { MapItemsAndUserToICart } from '../mappers/CartMappers';
import { StatusCodes } from '../enums/StatusCodes';
import { ICartPutDto } from '../DTOs/cart/CartPutDto';
import { GetObjectAsNullable } from '../utils/general/ObjectsHelper';

const USER_ID = '64bc314402e89eccce1cda25';

export async function PostCart(req: Request, res: Response): Promise<void> {
  const cartDto: ICartPostDto = req.body;
  await TryCreateCart(cartDto, res);
}

export async function PutCart(req: Request, res: Response): Promise<void> {
  const cartDto: ICartPutDto = req.body;
  cartDto.id = req.params['id'];
  await TryUpdateCart(cartDto, res);
}

export async function GetUserCart(req: Request, res: Response): Promise<void> {
  const user = await FindUserById(USER_ID);
  const userCart = await Cart.findOne({ user: user?._id, isOrdered: false });
  res.status(StatusCodes.OK).send(userCart);
}

async function TryCreateCart(cartDto: ICartPostDto, res: Response): Promise<void> {
  try {
    await CreateCart(cartDto, res);
  } catch (error) {
    HandleError(error as Error, res);
  }
}

async function CreateCart(cartDto: ICartPostDto, res: Response): Promise<void> {
  const [user, items] = await FindUserAndItems(cartDto.cart);

  if (!IsCartAndUserDataValid(user, items)) {
    res.status(StatusCodes.CONFLICT).send();
    return;
  }

  await Cart.create(MapItemsAndUserToICart(items, cartDto.cart, user as IUser));
  res.status(StatusCodes.OK).send();
}

async function TryUpdateCart(cartDto: ICartPutDto, res: Response): Promise<void> {
  try {
    await UpdateCart(cartDto, res);
  } catch (error) {
    HandleError(error as Error, res);
  }
}

async function UpdateCart(cartDto: ICartPutDto, res: Response): Promise<void> {
 const [user, items] = await FindUserAndItems(cartDto.cart);

  if (GetObjectAsNullable(user) === null) {
    res.status(StatusCodes.CONFLICT).send();
    return;
  }

  await Cart.findOneAndReplace({ _id: cartDto.id, user: user?.id }, MapItemsAndUserToICart(items, cartDto.cart, user as IUser));
  res.status(StatusCodes.NO_CONTENT).send();
}

function HandleError(error: Error, res: Response): void {
  console.log(error);
  res.status(StatusCodes.BAD_REQUEST).send();
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