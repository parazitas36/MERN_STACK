import { Schema } from 'mongoose';
import { IItem, Item } from './Item';

export interface ICartItem {
  item: IItem;
  amount: number;
}

export const CartItemSchema = new Schema<ICartItem>({
  item: { type: Schema.Types.ObjectId, ref: Item.modelName, required: true },
  amount: { type: Number, required: true },
});