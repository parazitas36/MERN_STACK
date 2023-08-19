import React from 'react';

import GuestRoutes from './routes/GuestRoutes';
import NavigationBar from './components/NavigationBar';
import { Paper, Container } from '@mui/material';

export const App: React.FC = () => {
	// const cartState = useAppSelector((state) => state.cartState);
	// const dispatch = useAppDispatch();

	// const test = () => {
	//   dispatch(InsertItemToCart(
	//     {
	//       id: "string",
	//       name: "string",
	//       price: 5,
	//       amount: 3
	//     }))
	// }

	return (
		<React.Fragment>
			<Paper elevation={1} sx={{minWidth: '350px'}}>
			<NavigationBar />
				<GuestRoutes />
			</Paper>
		</React.Fragment>
	);
};
