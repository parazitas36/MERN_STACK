import { ICartItemGetDto } from './CartItemGetDto';

export interface ICartPutDto {
  id?: string;
  cart: ICartItemGetDto[];
}