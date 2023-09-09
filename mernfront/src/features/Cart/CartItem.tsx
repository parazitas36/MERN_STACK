import React from 'react';

import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICartItemGetDto } from '../../data/DTOs/cart/CartItemGetDto';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { DropItemFromCart } from '../../redux/actions/CartActions';

interface Props {
	item: ICartItemGetDto;
}

const CartItem = (props: Props) => {
	const dispatch = useAppDispatch();

	const Remove = () => {
		dispatch(DropItemFromCart(props.item));
	};

	return (
		<ListItem
			alignItems="flex-start"
			sx={{ minWidth: 300 }}
		>
			<ListItemAvatar>
				<Avatar
					variant="rounded"
					src="https://random.imagecdn.app/300/300"
				/>
			</ListItemAvatar>
			<ListItemText
				sx={{ flexGrow: 1, paddingRight: 2 }}
				primary={props.item.name}
				secondary={
					<Typography
						sx={{ display: 'inline' }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						{`${props.item.price}$ x ${props.item.amount}`}
					</Typography>
				}
			/>
			<ListItemSecondaryAction>
				<IconButton onClick={Remove}>
					<DeleteIcon
						color="error"
						sx={{ fontSize: 24 }}
					/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default CartItem;
