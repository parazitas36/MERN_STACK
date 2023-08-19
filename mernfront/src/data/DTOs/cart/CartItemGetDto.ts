import { IItemShortGetDto } from '../item/ItemShortGetDto';

export interface ICartItemGetDto extends IItemShortGetDto {
  amount: number;
}