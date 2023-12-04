import { Box, Container, Stack } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import Login from './Login';
import AuthTab from './AuthTab';
import { TAuthTypes } from './TAuthTypes';
import { useParams } from 'react-router-dom';
import Register from './Register';
import { Subscribe } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

const Auth = () => {
	const params = useParams();
	const defaultTab = params?.type === 'register' ? 'sign up' : 'sign in';
	const [selectedTab, setSelectedTab] = useState<TAuthTypes>(defaultTab);

	const switchTab = useCallback(
		(type: TAuthTypes) => {
			setSelectedTab(type);
		},
		[selectedTab],
	);

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
					{selectedTab === 'sign in' ? <Login /> : <Register />}
				</Container>
			</Container>
		</Box>
	);
};

export default Auth;
