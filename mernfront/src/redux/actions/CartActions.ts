import { ICartItemGetDto } from './../../data/DTOs/cart/CartItemGetDto';
import { ActionsEnum } from './ActionsEnum';
import { createAction } from '@reduxjs/toolkit';

export const LoadCart = createAction<ICartItemGetDto[]>(ActionsEnum.LoadCard.toString());
export const InsertItemToCart = createAction<ICartItemGetDto>(ActionsEnum.InsertItemToCart.toString());
export const DropItemFromCart = createAction<ICartItemGetDto>(ActionsEnum.RemoveItemFromCart.toString());
export const ClearCart = createAction(ActionsEnum.ClearCart.toString());