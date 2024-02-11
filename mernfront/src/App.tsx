import React, { useEffect } from 'react';

import GuestRoutes from './routes/GuestRoutes';
import NavigationBar from './components/NavigationBar';
import { Box, Paper } from '@mui/material';
import Footer from './components/Footer';
import Notifications from './components/Notifications';

export const App: React.FC = () => {
	const oauthLogin = async () => {
		try {
			const url = `${process.env.API_URL as string}/auth/login`;
			const response = await fetch(url, {
				credentials: 'include',
			});
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		(async() => {
			await oauthLogin();
		})();
	}, []);

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
