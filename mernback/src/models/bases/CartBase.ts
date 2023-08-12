import { ICartItem } from '../CartItem';
import { IUser } from '../User';

export interface CartBase {
  user: IUser;
  items: [ICartItem];
}