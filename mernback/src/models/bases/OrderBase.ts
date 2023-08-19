import { OrderStatus } from '../../enums/OrderStatus';
import { ICart } from '../Cart';
import { IDeliveryAddress } from '../DeliveryAddress';
import { IUser } from '../User';

export interface OrderBase {
  cart: ICart;
  deliveryAddress: IDeliveryAddress;
  orderStatus: OrderStatus;
  orderedAt: Date;
  totalSum: number;
  user: IUser;
}