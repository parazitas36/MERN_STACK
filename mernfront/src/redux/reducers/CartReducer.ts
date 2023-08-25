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
			LoadFetchedCart(state, action);
		})
		.addCase(InsertItemToCart, (state, action) => {
			AddItemToCart(state, action);
		})
		.addCase(DropItemFromCart, (state, action) => {
			RemoveItemFromCart(state, action);
		})
		.addCase(ClearCart, (state, action) => {
			InitializeNewCart(state, action);
		});
});

function LoadFetchedCart(state: CartState, action: Action<ICartItemGetDto[]>): void {
	state.cart = action.payload || [];
}

function AddItemToCart(state: CartState, action: Action<ICartItemGetDto>): void {
	if (action.payload !== undefined) {
		state.cart.push(action.payload);
	}
}

function RemoveItemFromCart(state: CartState, action: Action<ICartItemGetDto>): void {
	if (action.payload !== undefined) {
		state.cart = state.cart.filter((item) => item.id !== action.payload?.id);
	}
}

function InitializeNewCart(state: CartState, action: Action<undefined>): void {
	state.cart = [];
}