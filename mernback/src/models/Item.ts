import { Document, Schema, model } from 'mongoose';
import { ItemCategory } from '../enums/ItemCategory';
import { IItemDetails, ItemDetailsSchema } from './ItemDetails';

export interface IItem extends Document {
  amount: number;
  category: ItemCategory;
  description: string;
  details?: [IItemDetails];
  name: string;
}

const itemSchema = new Schema<IItem>({
  amount: { type: Number, required: true },
  category: { type: Number, required: true },
  description: { type: String, required: true },
  details: { type: [ItemDetailsSchema], required: false },
  name: { type: String, required: true },
});

export const Item = model<IItem>('Item', itemSchema);
