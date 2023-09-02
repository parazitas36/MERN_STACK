import React from 'react';

import GuestRoutes from './routes/GuestRoutes';
import NavigationBar from './components/NavigationBar';
import { Box, Paper } from '@mui/material';
import Footer from './components/Footer';
import Notifications from './components/Notifications';

export const App: React.FC = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<NavigationBar />
			<Paper sx={{ width: '100%', flexGrow: 1, overflowY: 'scroll' }}>
				<GuestRoutes />
				<Notifications />
			</Paper>
			<Footer />
		</Box>
	);
};
