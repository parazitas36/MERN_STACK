import React from 'react';

import { Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Stack, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IItemShortGetDto } from '../../data/DTOs/item/ItemShortGetDto';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { InsertItemToCart } from '../../redux/actions/CartActions';

const Product: React.FC = () => {
	const dispatch = useAppDispatch();

	const data: IItemShortGetDto = {
		id: "id",
		name: "Title",
		price: 39.99,
	};

	const AddToCart = () => {
	  dispatch(InsertItemToCart({...data, amount: 1}))
	}

	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			xl={3}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 300, background: 'transparent' }}>
				<Card sx={{ margin: 2, overflow: 'hidden', boxShadow: 3, borderRadius: 2 }}>
					<CardHeader
						title={`${data.price}$`}
						subheader={data.name}
					/>
					<CardMedia
						component="img"
						sx={{ overflow: 'hidden' }}
						image="https://random.imagecdn.app/300/300"
					/>
					<CardActions sx={{ justifyContent: 'center' }}>
						<IconButton sx={{ padding: 1, borderRadius: 3 }} onClick={AddToCart}>
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
