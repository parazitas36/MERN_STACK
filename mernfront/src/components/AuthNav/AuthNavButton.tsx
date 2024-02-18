import { Box, IconButton, Popper, SxProps, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Login from '../../features/Auth/Login';
import { Emit, Subscribe } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Profile } from './ProfileMenu';

const AuthNavButton = () => {
	const accountState = useAppSelector(states => states.accountState);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Emit(Events.ClosePoppers);
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'auth-menu-button';

	useEffect(() => {
		Subscribe(Events.ClosePoppers, () => setAnchorEl(null))
	}, []);

	return (
		<>
			<Tooltip title={accountState.accountInfo ? "Profile" : "Sign In"}>
				<IconButton
					aria-describedby={id}
					onClick={handleClick}
				>
					{accountState.accountInfo ? 
						<AccountCircleIcon sx={IconSxProps} />
						:<LoginIcon sx={IconSxProps} /> }
				</IconButton>
			</Tooltip>
			<Popper
				open={Boolean(anchorEl)}
				id={id}
				anchorEl={anchorEl}
				sx={{ zIndex: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 10 }}
			>
				{accountState.accountInfo ? <Profile accountState={accountState}/> : <Login isInPopper={true} />}
			</Popper>
		</>
	);
};

export default AuthNavButton;

const IconSxProps: SxProps = {
	fontSize: 30, 
	color: 'primary.contrastText',
}
