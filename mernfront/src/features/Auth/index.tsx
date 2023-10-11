import { Container } from '@mui/material';
import React from 'react';
import Login from './Login';

const Auth = () => {
	return (
		<Container maxWidth='xs' sx={{ backgroundColor: 'background.paper' }}>
			<Login />
		</Container>
	);
};

export default Auth;
