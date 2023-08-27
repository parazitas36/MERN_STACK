import { Box, Container, Divider, List, ListItem, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import CartMenuItem from './CartMenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../hooks/useAppSelector';

const CartMenuList = () => {
	const cartState = useAppSelector((state) => state.cartState);
	const cartItems = cartState.cart;

	const SumMemo = useMemo(() => {
		return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2);
	}, [cartItems]);

	if (cartItems.length > 0) {
		return (
			<List sx={{ bgcolor: 'background.paper', maxWidth: 400 }}>
				<Box sx={{ maxHeight: 450, overflowY: 'scroll', backgroundColor: 'inherit' }}>
					{cartItems.map((item, i) => (
						<>
							<CartMenuItem item={item} />
							<Divider
								variant="fullWidth"
								component="li"
							/>
						</>
					))}
				</Box>
				<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Typography variant="h5">{`Total: ${SumMemo}$`}</Typography>
				</ListItem>
			</List>
		);
	}

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				bgcolor: 'background.paper',
				width: 275,
				height: 310,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ShoppingCartIcon sx={{ fontSize: 40, color: 'grey.700' }} />
			<Typography
				my={2}
				sx={{ fontSize: 20 }}
			>
				Your cart is empty
			</Typography>
		</Container>
	);
};

export default CartMenuList;
