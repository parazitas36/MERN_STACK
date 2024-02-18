import React, { useCallback, useEffect } from 'react';

import GuestRoutes from './routes/GuestRoutes';
import NavigationBar from './components/NavigationBar';
import { Box, Paper } from '@mui/material';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import { LoggedIn } from './redux/actions/AccountActions';
import { useAppDispatch } from './hooks/useAppDispatch';
import { IUserGetDto } from './data/DTOs/user/IUserGetDto';
import { useAppSelector } from './hooks/useAppSelector';

export const App: React.FC = () => {
	const account = useAppSelector(states => states.accountState);
	const dispatch = useAppDispatch();
	
	const oauthLogin = useCallback(async () => {
		if (account.accountInfo) {
			return;
		}

		try {
			const url = `${process.env.API_URL as string}/auth/login`;
			const response = await fetch(url, {
				credentials: 'include',
			});

			const accountInfo: IUserGetDto = await response.json();
			dispatch(LoggedIn(accountInfo));
		} catch (err) {
			console.log(err);
		}
	}, [account.accountInfo]);

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
