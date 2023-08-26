import React from 'react';

import GuestRoutes from './routes/GuestRoutes';
import NavigationBar from './components/NavigationBar';
import { Box, Container, Paper } from '@mui/material';
import Footer from './components/Footer';

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
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
			<NavigationBar />
			<Paper sx={{ width: '100%', flexGrow: 1, overflowY: 'scroll'}}>
				<GuestRoutes />
			</Paper>
			<Footer />
		</Box>
	);
};
