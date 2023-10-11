import CartList from '../../features/Cart/CartList';
import React from 'react';

const CartNavList = () => {
	return (
		<CartList
			cartWindowSxProps={{ maxWidth: 400, maxHeight: 450 }}
			emptyCartWindowSxProps={{ width: 275, height: 310 }}
            shouldShowBuyButton
		/>
	);
};

export default CartNavList;
