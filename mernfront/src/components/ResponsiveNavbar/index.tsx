import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavigationLogo from '../NavigationLogo';
import { ResponsiveNavbarProps } from './props/ResponsiveNavbarProps';
import ResponsiveNavbarLinks from './ResponsiveNavbarLinks';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, IconButton, Stack } from '@mui/material';

const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = (props: ResponsiveNavbarProps) => {
	const isInSmallScreen = useMediaQuery('(max-width:700px)');
	const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

	const toggleMenu = (): void => {
		setIsMenuToggled((prevState) => !prevState);
	};

	return (
		<Grid
			container
			sx={{ display: isInSmallScreen === true ? 'block' : 'flex' }}
		>
			<Grid
				item
				flexGrow={1}
			>
				<Stack direction="row" paddingY={2}>
					<NavigationLogo />
					<IconButton
						sx={{ display: isInSmallScreen ? 'flex' : 'none' }}
						onClick={toggleMenu}
					>
						<MenuIcon sx={{ color: 'white', fontSize: 40 }} />
					</IconButton>
				</Stack>
			</Grid>
			<Grid item sx={{alignSelf: 'center'}}>
				<ResponsiveNavbarLinks
					links={props.links}
					isInSmallScreen={isInSmallScreen}
					isMenuToggled={isMenuToggled}
				/>
			</Grid>
		</Grid>
	);
};

export default ResponsiveNavbar;
