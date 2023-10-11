import { IconButton, Popper, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import Auth from '../../features/Auth';

const AuthNavButton = () => {

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'auth-menu-button';

	return (
		<>
			<Tooltip title="Sign In">
				<IconButton
					aria-describedby={id}
					onClick={handleClick}
				>
                    <LoginIcon sx={{ fontSize: 30, color: 'primary.contrastText' }}  />
				</IconButton>
			</Tooltip>
			<Popper
				open={Boolean(anchorEl)}
				id={id}
				anchorEl={anchorEl}
				sx={{ zIndex: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 10 }}
			>
				<Auth />
			</Popper>
		</>
	);
}

export default AuthNavButton