import React from 'react';
import CartList from '../features/Cart/CartList';
import { Container, Typography } from '@mui/material';

const CartPage = () => {
	return (
		<Container>
            <Typography variant='h4' ml={2} mt={3}>
                Your cart
            </Typography>
			<CartList
				cartWindowSxProps={{ width: '100%', maxHeight: '80&' }}
				emptyCartWindowSxProps={{ width: 275, height: 310 }}
			/>
		</Container>
	);
};

export default CartPage;
