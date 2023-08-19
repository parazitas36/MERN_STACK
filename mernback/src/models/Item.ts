import { Document, Schema, model } from 'mongoose';
import { ItemDetailsSchema } from './ItemDetails';
import { ItemBase } from './bases/ItemBase';

export interface IItem extends Document, ItemBase {}

const itemSchema = new Schema<IItem>({
  amount: { type: Number, required: true },
  category: { type: Number, required: true },
  description: { type: String, required: true },
  details: { type: [ItemDetailsSchema], required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Item = model<IItem>('Item', itemSchema);