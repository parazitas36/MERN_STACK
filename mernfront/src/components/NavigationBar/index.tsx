import React from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';
import ResponsiveNavbar from '../ResponsiveNavbar';
import { NavItem } from '../../data/types/NavItem';


const NavigationBar: React.FC = () => {
	const links: NavItem[] = [
		{
			label: 'Label 1',
    		route: '/label1',
		},
		{
			label: 'Label 2',
    		route: '/label2',
		},
		{
			label: 'Label 3',
    		route: '/label3',
		},
	]
	return (
		<AppBar component="nav" position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ResponsiveNavbar links={links} />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavigationBar;
