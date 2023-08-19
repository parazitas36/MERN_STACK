import { ICartItemGetDto } from '../../data/DTOs/cart/CartItemGetDto';
import { ClearCart, DropItemFromCart, InsertItemToCart, LoadCart } from '../actions/CartActions';
import { Action } from '../types/Action';
import { CartState } from '../types/CartState';
import { createReducer } from '@reduxjs/toolkit';

const initialState: CartState = {
	cart: [],
};

export const CartReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(LoadCart, (state, action) => {
			state = LoadFetchedCart(state, action);
		})
		.addCase(InsertItemToCart, (state, action) => {
			state = AddItemToCart(state, action);
		})
		.addCase(DropItemFromCart, (state, action) => {
			state = RemoveItemFromCart(state, action);
		})
		.addCase(ClearCart, (state, action) => {
			state = InitializeNewCart(state, action);
		});
});

function LoadFetchedCart(state: CartState, action: Action<ICartItemGetDto[]>): CartState {
	return { ...state, cart: action.payload || [] };
}

function AddItemToCart(state: CartState, action: Action<ICartItemGetDto>): CartState {
	return {
		...state,
		cart: AddItem(state.cart, action.payload),
	};
}

function RemoveItemFromCart(state: CartState, action: Action<ICartItemGetDto>): CartState {
	return {
		...state,
		cart: RemoveItem(state.cart, action.payload),
	};
}

function InitializeNewCart(state: CartState, action: Action<undefined>): CartState {
	return {
		...state,
		cart: [],
	};
}

function AddItem(cart: ICartItemGetDto[], itemToAdd: ICartItemGetDto | undefined): ICartItemGetDto[] {
	if (itemToAdd === undefined) return cart;
	cart.push(itemToAdd);
	return cart;
}

function RemoveItem(cart: ICartItemGetDto[], itemToRemove: ICartItemGetDto | undefined): ICartItemGetDto[] {
	return itemToRemove === undefined ? cart : cart.filter((item) => item.id === itemToRemove.id);
}