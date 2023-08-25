import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Popper, Tooltip } from '@mui/material';
import CartMenuList from './CartMenuList';

const CartMenuButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'cart-menu-button';

	return (
		<>
			<Tooltip title="Cart">
				<IconButton
					aria-describedby={id}
					onClick={handleClick}
				>
					<ShoppingCartIcon sx={{ fontSize: 30, color: 'primary.contrastText' }}  />
				</IconButton>
			</Tooltip>
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
