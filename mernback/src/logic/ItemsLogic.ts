import { IItemPostDto, ItemPostDto } from '../DTOs/item/ItemPostDto';
import { IItem, Item } from '../models/Item';
import { MapToIItem, MapToIItemShortGetDtoArray } from '../mappers/ItemMappers';
import { IItemShortGetDto } from '../DTOs/item/ItemShortGetDto';
import { ItemCategory } from '../enums/ItemCategory';

export async function GetAllItems(): Promise<IItemShortGetDto[]> {
  const items = await Item.find({});
  return MapToIItemShortGetDtoArray(items);
}

export async function GetAllItemsByCategory(category: ItemCategory): Promise<IItem[]> {
  return await Item.find({ category: category});
}

export async function GetItemById(id: string): Promise<IItem | null> {
  return await Item.findById(id);
}

/**
 * Creates new item in database.
 * @param itemDto New item's information.
 * @returns Outcome if creation was successful or not.
 */
export async function PostItem(itemDto: IItemPostDto): Promise<boolean> {
  const item = new ItemPostDto(itemDto);
  return await CreateItem(item);
}

export async function FindItemsByIds(itemIds: string[]): Promise<IItem[]> {
  return await Item.find({ _id: { $in: itemIds } }).exec();
}

async function CreateItem(itemDto: ItemPostDto): Promise<boolean> {
  if (await DoesItemExist(itemDto)) {
    return false;
  } 
  
  await Item.create(MapToIItem(itemDto));
  return true;
}

async function DoesItemExist(itemDto: ItemPostDto): Promise<boolean> {
  const existingItem = await Item.findOne({ name: itemDto.name }).exec();
  return existingItem !== null;
}