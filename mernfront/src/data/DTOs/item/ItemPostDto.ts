import { ItemCategory } from '../../enums/ItemCategory';
import { IItemDetails } from './ItemDetails';

export interface IItemPostDto {
  amount: number;
  category: ItemCategory;
  description: string;
  details?: IItemDetails[];
  name: string;
  price: number;
}
