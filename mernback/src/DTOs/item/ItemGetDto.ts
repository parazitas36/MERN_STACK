import { ItemCategory } from '../../enums/ItemCategory';
import { IItemDetails } from '../../models/ItemDetails';

export interface IItemGetDto {
  id: number;
  amount: number;
  category: ItemCategory;
  description: string;
  details?: [IItemDetails];
  name: string;
}