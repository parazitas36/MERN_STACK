import { Schema } from 'mongoose';

export interface IItemDetails {
  description: string;
  name: string;
}

export const ItemDetailsSchema = new Schema<IItemDetails>({
  description: { type: String, required: true },
  name: { type: String, required: true },
});