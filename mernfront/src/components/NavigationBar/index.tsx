import React from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import ResponsiveNavbar from '../ResponsiveNavbar';
import { NavItem } from '../../data/types/NavItem';
import CartNavButton from '../CartNav/CartNavButton';
import AuthNavButton from '../AuthNav/AuthNavButton';

const NavigationBar: React.FC = () => {
	const links: NavItem[] = [
		{
			label: 'Cart',
			component: <CartNavButton />,
			route: '/cart',
		},
		{
			label: 'Label 2',
			route: '/label2',
		},
		{
			label: 'Sign in',
			component: <AuthNavButton />,
			route: '/auth',
		},
	];
	return (
		<AppBar
			component="nav"
			position="sticky"
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ResponsiveNavbar items={links} />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavigationBar;