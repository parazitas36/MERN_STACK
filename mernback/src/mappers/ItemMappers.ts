import { ItemPostDto } from '../DTOs/item/ItemPostDto';
import { IItem } from '../models/Item';

export function MapToIItem(dto: ItemPostDto): IItem {
  return {
    amount: dto.amount,
    category: dto.category,
    description: dto.description,
    details: dto.details,
    name: dto.name,
    price: dto.price,
  } as IItem;
}