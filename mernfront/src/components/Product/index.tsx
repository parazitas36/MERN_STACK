import React from 'react';
import { v4 as uuid } from 'uuid';

import DisplayNotification from '../../helpers/DisplayNotification';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';

import { IItemShortGetDto } from '../../data/DTOs/item/ItemShortGetDto';
import { InsertItemToCart } from '../../redux/actions/CartActions';
import { NotificationData } from '../../redux/types/NotificationData';

interface Props {
	data: IItemShortGetDto;
}

const Product: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();

	const AddToCart = () => {
		dispatch(InsertItemToCart({ ...props.data, amount: 1 }));

		const notification: NotificationData = {
			message: 'Item was added to the cart!',
			severity: 'success',
			id: uuid(),
		};

		DisplayNotification({ dispatch, notification });
	};

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
						title={`${props.data.price}$`}
						subheader={props.data.name}
					/>
					<CardMedia
						component="img"
						sx={{ overflow: 'hidden' }}
						image="https://picsum.photos/300/300"
					/>
					<CardActions sx={{ justifyContent: 'center' }}>
						<IconButton
							sx={{ padding: 1, borderRadius: 3 }}
							onClick={AddToCart}
						>
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
