import { Divider, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import CartMenuItem from './CartMenuItem';

const CartMenuList = () => {
	const test = [1, 2, 3, 4, 5, 6];
	return (
		<List sx={{ bgcolor: 'background.paper', maxWidth: 400 }}>
			{test.map((x, i) => (
				<>
					<CartMenuItem />
					<Divider
						variant="fullWidth"
						component="li"
					/>
				</>
			))}
			<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Typography variant="h5">Total: 112.23$</Typography>
			</ListItem>
		</List>
	);
};

export default CartMenuList;