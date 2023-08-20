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

const CartMenuItem = () => {
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
				sx={{ flexGrow: 1 }}
				primary="Item name"
				secondary={
					<Typography
						sx={{ display: 'inline' }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						Price: 10.99$
					</Typography>
				}
			/>
			<ListItemSecondaryAction>
				<IconButton>
					<DeleteIcon
						color="error"
						sx={{ fontSize: 24 }}
					/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default CartMenuItem;