import { IconButton, Popper, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Login from '../../features/Auth/Login';
import { Emit, Subscribe } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

const AuthNavButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Emit(Events.ClosePoppers);
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const id = 'auth-menu-button';

	useEffect(() => {
		Subscribe(Events.ClosePoppers, () => setAnchorEl(null))
	}, [])
	

	return (
		<>
			<Tooltip title="Sign In">
				<IconButton
					aria-describedby={id}
					onClick={handleClick}
				>
					<LoginIcon sx={{ fontSize: 30, color: 'primary.contrastText' }} />
				</IconButton>
			</Tooltip>
			<Popper
				open={Boolean(anchorEl)}
				id={id}
				anchorEl={anchorEl}
				sx={{ zIndex: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 10 }}
			>
				<Login isInPopper={true} />
			</Popper>
		</>
	);
};

export default AuthNavButton;
