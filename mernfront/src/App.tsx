import React from 'react'
import { ICartItemGetDto } from './data/DTOs/cart/CartItemGetDto';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { InsertItemToCart } from './statesManagement/actions/CartActions';

export const App: React.FC = () => {
  const cartState = useAppSelector((state) => state.cartState);
  const dispatch = useAppDispatch();

  const test = () => {
    dispatch(InsertItemToCart(
      {
        id: "string",
        name: "string",
        price: 5, 
        amount: 3
      } as ICartItemGetDto))
  }

  return (
    <div>
      {cartState.cart.length}
      <button onClick={test}>Press</button>
    </div>
  )
}