import React, { useMemo } from 'react';
import { Box, Divider, List, ListItem, SxProps, Typography, Button } from '@mui/material';
import CartItem from './CartItem';
import { useAppSelector } from '../../hooks/useAppSelector';
import CartEmpty from './CartEmpty';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Emit } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

interface Props {
	cartWindowSxProps: SxProps;
	emptyCartWindowSxProps: SxProps;
	shouldShowBuyButton?: boolean;
}

const CartList = (props: Props) => {
	const cartState = useAppSelector((state) => state.cartState);
	const cartItems = cartState.cart;

	const navigate = useNavigate();

	const SumMemo = useMemo(() => {
		return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0).toFixed(2);
	}, [cartItems]);

	const navigateToCartListPage = () => {
		Emit(Events.ClosePoppers);
		navigate('/cart');
	}

	if (cartItems.length > 0) {
		return (
			<List sx={{ bgcolor: 'background.paper' }}>
				<Box sx={{ ...props.cartWindowSxProps, overflowY: 'scroll', backgroundColor: 'inherit' }}>
					{cartItems.map((item) => (
						<React.Fragment key={item.id}>
							<CartItem item={item} />
							<Divider
								variant="fullWidth"
								component="li"
							/>
						</React.Fragment>
					))}
				<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Typography variant="h5">{`Total: ${SumMemo}$`}</Typography>
				</ListItem>
				{props.shouldShowBuyButton == true ? (
					<ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							onClick={navigateToCartListPage}
							variant="contained"
							color="primary"
							sx={{ paddingX: 3, paddingY: 1, width: '90%' }}
						>
							<ShoppingCartIcon />
							<Typography
								variant="subtitle1"
								ml={1}
								sx={{ fontWeight: 'bold' }}
							>
								BUY
							</Typography>
						</Button>
					</ListItem>
				) : null}
				</Box>
			</List>
		);
	}

	return <CartEmpty containerProps={props.emptyCartWindowSxProps} />;
};

export default React.memo(CartList);
