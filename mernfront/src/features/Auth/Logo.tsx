import React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography } from '@mui/material';

const Logo: React.FC = () => {

	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
            <Typography
                variant="h4"
                noWrap
                sx={{
                    fontFamily: 'lato',
                    letterSpacing: '.3rem',
                    color: 'primary.main',
                    textDecoration: 'none',
                    userSelect: 'none',
                }}
            >
                MERN E-SHOP
            </Typography>
            <ShoppingCartIcon sx={{ fontSize: { xs: 25, sm: 30 }, ml: '.3em', color: 'primary.main', }} />
		</Box>
	);
};

export default Logo;
