import { Request, Response } from 'express';
import { IItemPostDto, ItemPostDto } from '../DTOs/item/ItemPostDto';
import { IItem, Item } from '../models/Item';
import { MapToIItem } from '../mappers/ItemMappers';
import { StatusCodes } from '../enums/StatusCodes';

export async function GetAllItems(req: Request, res: Response): Promise<void> {
  const items = await Item.find({});
  res.status(StatusCodes.OK).send(items);
}

export async function GetAllItemsByCategory(req: Request, res: Response): Promise<void> {
  const items = await Item.find({ category: req.params['category'] });
  res.status(StatusCodes.OK).send(items);
}

export async function GetItemById(req: Request, res: Response): Promise<void> {
  const item = await Item.findById(req.params['id']);
  res.status(item !== null ? StatusCodes.OK : StatusCodes.NOT_FOUND).send(item);
}

export async function PostItem(req: Request, res: Response): Promise<void> {
  const itemDto: IItemPostDto = req.body;
  await TryCreateItem(itemDto, res);
}

export async function FindItemsByIds(itemIds: string[]): Promise<IItem[]> {
  return await Item.find({ _id: { $in: itemIds } }).exec();
}

async function TryCreateItem(itemDto: IItemPostDto, res: Response): Promise<void> {
  try {
    await CreateItem(new ItemPostDto(itemDto), res);
  } catch (error) {
    HandleError(error as Error, res);
  }
}

async function CreateItem(itemDto: ItemPostDto, res: Response): Promise<void> {
  if (await DoesItemExist(itemDto)) {
    res.status(StatusCodes.CONFLICT).send();
  } else {
    await Item.create(MapToIItem(itemDto));
    res.status(StatusCodes.CREATED).send();
  }
}

function HandleError(error: Error, res: Response): void {
  console.log(error);
  res.status(StatusCodes.BAD_REQUEST).send();
}

async function DoesItemExist(itemDto: ItemPostDto): Promise<boolean> {
  const existingItem = await Item.findOne({ name: itemDto.name }).exec();
  return existingItem !== null;
}