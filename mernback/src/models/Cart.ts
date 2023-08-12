import { Document, Schema, model } from 'mongoose';
import { CartBase } from './bases/CartBase';
import { CartItemSchema } from './CartItem';
import { User } from './User';

export interface ICart extends Document, CartBase {}

const cartSchema = new Schema<ICart>({
  items: { type: [CartItemSchema], required: true },
  user: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
});

export const Cart = model<ICart>('Cart', cartSchema);