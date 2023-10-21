import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Popper, Tooltip } from '@mui/material';
import CartNavList from './CartNavList';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Emit, Subscribe } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

const CartNavButton = () => {
	const cart = useAppSelector(states => states.cartState.cart);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Emit(Events.ClosePoppers);
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'cart-menu-button';

	useEffect(() => {
		Subscribe(Events.ClosePoppers, () => setAnchorEl(null));
	}, [])
	

	return (
		<>
			<Tooltip title="Cart">
				<IconButton
					aria-describedby={id}
					onClick={handleClick}
				>
					<Badge badgeContent={cart.length || 0} showZero color="secondary">
						<ShoppingCartIcon sx={{ fontSize: 30, color: 'primary.contrastText' }}  />
  					</Badge>
				</IconButton>
			</Tooltip>
			<Popper
				open={Boolean(anchorEl)}
				id={id}
				anchorEl={anchorEl}
				sx={{ zIndex: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 10 }}
			>
				<CartNavList />
			</Popper>
		</>
	);
};

export default CartNavButton;
