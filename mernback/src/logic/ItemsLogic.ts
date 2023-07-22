import { Request, Response } from 'express';
import { IItemPostDto, ItemPostDto } from '../DTOs/item/ItemPostDto';
import { Item } from '../models/Item';
import { MapToIItem } from '../mappers/ItemMappers';

export async function GetAllItems(req: Request, res: Response): Promise<void> {
  const items = await Item.find({});
  res.status(200).send(items);
}

export async function GetAllItemsByCategory(req: Request, res: Response): Promise<void> {
  const items = await Item.find({ category: req.params['category'] });
  res.status(200).send(items);
}

export async function GetItemById(req: Request, res: Response): Promise<void> {
  const item = await Item.findById(req.params['id']);
  res.status(item !== null ? 200 : 404).send(item);
}

export async function PostItem(req: Request, res: Response): Promise<void> {
  const itemDto: IItemPostDto = req.body;
  TryCreateItem(itemDto, res);
}

async function TryCreateItem(itemDto: IItemPostDto, res: Response): Promise<void> {
  try {
    await CreateItem(new ItemPostDto(itemDto), res);
  } catch (error) {
    HandleError(error as Error, res);
  }
}

async function CreateItem(itemDto: ItemPostDto, res: Response): Promise<void> {
  const existing = await Item.findOne({ name: itemDto.name }).exec();

  if (existing !== null) {
    res.status(409).send();
    return;
  }

  await Item.create(MapToIItem(itemDto));
  res.status(201).send();
}

function HandleError(error: Error, res: Response): void {
  console.log(error);
  res.status(409).send();
}