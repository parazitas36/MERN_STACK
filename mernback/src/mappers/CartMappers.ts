import { ICartItemGetDto } from '../DTOs/cart/CartItemGetDto';
import { ICart } from '../models/Cart';
import { ICartItem } from '../models/CartItem';
import { IItem } from '../models/Item';
import { IUser } from '../models/User';
import { GetObjectAsNullable } from '../utils/general/ObjectsHelper';

export function MapItemsAndUserToICart(dbItems: IItem[], cartItems: ICartItemGetDto[], user: IUser): ICart {
  return {
    items: MapIItemsToICartItems(dbItems, cartItems),
    isOrdered: false,
    user: user,
  } as ICart;
}

function MapIItemsToICartItems(dbItems: IItem[], cartItems: ICartItemGetDto[]): ICartItem[] {
  const mappedCartItems = dbItems.map((item) => FindAndMapCartItem(item, cartItems)).filter((item) => item !== null);
  return mappedCartItems as ICartItem[];
}

function FindAndMapCartItem(itemToFind: IItem, cartItems: ICartItemGetDto[]): ICartItem | null {
  const foundCartItem = cartItems.find((cartItem) => cartItem.id === itemToFind.id);
  return IsICartItemGetDtoValid(foundCartItem)
    ? {
        item: itemToFind,
        amount: foundCartItem?.amount || 1,
      }
    : null;
}

function IsICartItemGetDtoValid(itemDto: ICartItemGetDto | undefined): boolean {
  return GetObjectAsNullable<ICartItemGetDto>(itemDto) !== null 
        && (itemDto?.amount ?? 0) > 0;
}
