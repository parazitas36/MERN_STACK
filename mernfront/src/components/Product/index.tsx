import React from 'react';

import { Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Product: React.FC = () => {
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			xl={3}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 300 }}>
				<Card sx={{ margin: 2, overflow: 'hidden' }}>
					<CardHeader
						title="Title"
						subheader="subheader"
					/>
					<CardMedia
						component="img"
						sx={{ overflow: 'hidden' }}
						image="https://random.imagecdn.app/300/300"
					/>
					<CardActions sx={{ justifyContent: 'center' }}>
						<IconButton sx={{ padding: 1, borderRadius: 3 }}>
							<AddShoppingCartIcon />
							<Typography
								ml={2}
								variant="h6"
								color="initial"
							>
								Add to cart
							</Typography>
						</IconButton>
					</CardActions>
				</Card>
			</Box>
		</Grid>
	);
};

export default Product;
