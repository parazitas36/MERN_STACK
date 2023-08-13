import { ItemCategory } from '../../enums/ItemCategory';
import { IItemDetails } from '../../models/ItemDetails';

export interface IItemGetDto {
  id: string;
  amount: number;
  category: ItemCategory;
  description: string;
  details?: IItemDetails[];
  name: string;
  price: number;
}