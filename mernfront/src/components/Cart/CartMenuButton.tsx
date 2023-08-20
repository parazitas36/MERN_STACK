import React, { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { IconButton, Popper } from '@mui/material';
import CartMenuList from './CartMenuList';

const CartMenuButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'cart-menu-button';

	return (
		<>
			<IconButton
				aria-describedby={id}
				onClick={handleClick}
			>
				<ShoppingBasketIcon />
			</IconButton>
			<Popper
				open={Boolean(anchorEl)}
				id={id}
				anchorEl={anchorEl}
				sx={{ zIndex: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 10 }}
			>
				<CartMenuList />
			</Popper>
		</>
	);
};

export default CartMenuButton;