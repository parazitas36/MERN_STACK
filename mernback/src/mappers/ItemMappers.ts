import { IItemShortGetDto } from './../DTOs/item/ItemShortGetDto';
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

export function MapToIItemShortGetDto(item: IItem): IItemShortGetDto {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
  }
}

export function MapToIItemShortGetDtoArray(items: IItem[]): IItemShortGetDto[] {
  return items.map(item => MapToIItemShortGetDto(item));
}