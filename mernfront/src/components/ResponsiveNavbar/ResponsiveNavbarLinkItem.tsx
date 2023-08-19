import React from 'react';
import { NavItem } from '../../data/types/NavItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
	data: NavItem;
}

const ResponsiveNavbarLinkItem = (props: Props) => {
	const navigate = useNavigate();

	return (
		<Button
			variant="text"
			sx={{ color: 'white' }}
			onClick={() => navigate(props.data.route)}
		>
			{props.data.component === undefined 
                ? <>{props.data.label}</>
                : <>{props.data.component}</>}
		</Button>
	);
};

export default ResponsiveNavbarLinkItem;
