import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, SxProps, Typography } from '@mui/material';

interface Props {
    containerProps: SxProps
}

const CartEmpty = (props: Props) => {
    return (
		<Container
			sx={{
                ...props.containerProps,
				display: 'flex',
				flexDirection: 'column',
				bgcolor: 'background.paper',
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
}

export default CartEmpty