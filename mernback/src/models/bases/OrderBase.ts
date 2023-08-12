import { OrderStatus } from '../../enums/OrderStatus';
import { ICart } from '../Cart';
import { IUser } from '../User';

export interface OrderBase {
  cart: ICart;
  orderedAt: Date;
  orderStatus: OrderStatus;
  user: IUser;
}