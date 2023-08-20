import React from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import ResponsiveNavbar from '../ResponsiveNavbar';
import { NavItem } from '../../data/types/NavItem';
import CartMenuButton from '../Cart/CartMenuButton';

const NavigationBar: React.FC = () => {
	const links: NavItem[] = [
		{
			label: 'Label 1',
			icon: <CartMenuButton />,
			route: '/',
		},
		{
			label: 'Label 2',
			route: '/label2',
		},
		{
			label: 'Label 3',
			route: '/label3',
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