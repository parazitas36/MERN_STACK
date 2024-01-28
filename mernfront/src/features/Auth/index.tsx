import { Alert, AlertColor, Box, Container, Snackbar, Stack } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import Login from './Login';
import AuthTab from './AuthTab';
import { AuthTypes } from './AuthTypes';
import { useParams } from 'react-router-dom';
import Register from './Register';
import { Subscribe } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

export interface NotificationOptions {
	message: string;
	severity: AlertColor | undefined;
}

const Auth = () => {
	const params = useParams();
	const defaultTab = params?.type === 'register' ? 'sign up' : 'sign in';
	const [selectedTab, setSelectedTab] = useState<AuthTypes>(defaultTab);

	const switchTab = useCallback(
		(type: AuthTypes) => {
			setSelectedTab(type);
		},
		[selectedTab],
	);

	const [notification, setNotification] = useState<NotificationOptions>({
		message: '',
		severity: undefined,
	});

	useEffect(() => {
		Subscribe(Events.SwitchTabToSignIn, () => switchTab('sign in'));
		Subscribe(Events.SwitchTabToSignUp, () => switchTab('sign up'));
	}, [])
	

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				flexDirection: 'column',
			}}
		>
			<Container
				maxWidth="xs"
				sx={{
					display: 'flex',
					backgroundColor: 'background.paper',
					flexDirection: 'column',
					boxShadow: 7,
					borderRadius: '15px',
					paddingLeft: '0!important',
					paddingRight: '0!important',
					pb: 2,
				}}
			>
				<Stack
					direction="row"
					sx={{ width: '100%' }}
				>
					<AuthTab
						isSelected={selectedTab === 'sign in'}
						text="Sign In"
						side="left"
						onClick={(_) => switchTab('sign in')}
					/>
					<AuthTab
						isSelected={selectedTab === 'sign up'}
						text="Sign Up"
						side="right"
						onClick={(_) => switchTab('sign up')}
					/>
				</Stack>
				<Container
					maxWidth="xs"
					sx={{ backgroundColor: 'background.paper' }}
				>
					{selectedTab === 'sign in' ? <Login /> : <Register notification={notification} setNotification={setNotification}/>}
					<Snackbar
						open={(notification?.message.length ?? 0) > 0}
						onClose={() => setNotification({...notification, message: ""})}
						autoHideDuration={2000}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					>
						<Alert
							severity={notification?.severity}
							sx={{ width: '100%', marginBottom: { xs: 7, sm: 6 } }}
							variant='filled'
						>
							{notification?.message}
						</Alert>
					</Snackbar>
				</Container>
			</Container>
		</Box>
	);
};

export default Auth;
