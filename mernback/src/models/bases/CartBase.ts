import { ICartItem } from '../CartItem';
import { IUser } from '../User';

export interface CartBase {
  items: ICartItem[];
  isOrdered: boolean;
  user: IUser;
}