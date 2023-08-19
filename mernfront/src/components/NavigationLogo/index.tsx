import React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography } from '@mui/material';

const NavigationLogo: React.FC = () => {
	return (
		<Box
			flexGrow={1}
			sx={{ display: 'flex' , alignItems: 'center'}}
		>
			<Typography
				variant="h4"
				noWrap
				sx={{
					fontFamily: 'lato',
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				MERN E-SHOP
			</Typography>
			<ShoppingCartIcon sx={{ fontSize: 30, ml: '.3em' }} />
		</Box>
	);
};

export default NavigationLogo;
