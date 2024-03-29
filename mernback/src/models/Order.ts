import { Document, Schema, model } from 'mongoose';
import { OrderBase } from './bases/OrderBase';
import { Cart } from './Cart';
import { User } from './User';
import { DeliveryAddressSchema } from './DeliveryAddress';

export interface IOrder extends Document, OrderBase {}

const orderSchema = new Schema<IOrder>({
  cart: { type: Schema.Types.ObjectId, ref: Cart.modelName, required: true },
  deliveryAddress: { type: DeliveryAddressSchema, required: true },
  orderedAt: { type: Schema.Types.Date, required: true },
  orderStatus: { type: Number, required: true },
  totalSum: { type: Number, required: true },
  user: { type: Schema.Types.Date, ref: User.modelName, required: true },
});

export const Order = model<IOrder>('Order', orderSchema);