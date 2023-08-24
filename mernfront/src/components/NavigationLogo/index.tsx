import React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const NavigationLogo: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box
			flexGrow={1}
			sx={{ display: 'flex', alignItems: 'center' }}
		>
			<IconButton sx={{ borderRadius: 5 }} onClick={() => navigate('/')}>
				<Typography
					variant="h4"
					noWrap
					sx={{
						fontFamily: 'lato',
						letterSpacing: '.3rem',
						color: 'white',
						textDecoration: 'none',
						fontSize: { xs: 25, sm: 30 }
					}}
				>
					MERN E-SHOP
				</Typography>
				<ShoppingCartIcon sx={{ fontSize: { xs: 25, sm: 30 }, ml: '.3em', color: 'white', }} />
			</IconButton>
		</Box>
	);
};

export default NavigationLogo;
