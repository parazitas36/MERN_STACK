import React from 'react';
import { NavItem } from '../../data/types/NavItem';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarIcon from './NavbarIcon';

interface Props {
	data: NavItem;
	isInSmallScreen: boolean | false;
}

const ResponsiveNavbarItem: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();

	const onClick = (): void => {
		navigate(props.data.route);
	};

	if (props.isInSmallScreen) {
		return (
			<Button
				variant="text"
				sx={{ color: 'white' }}
				onClick={onClick}
			>
				<Stack
					spacing={1}
					direction="row"
				>
					<div>{props.data.icon}</div>
					<div>{props.data.label}</div>
				</Stack>
			</Button>
		);
	} else if (props.data.component !== undefined) {
		return <>{props.data.component}</>
	}

	return (
		<Button
			variant="text"
			sx={{ color: 'white' }}
			onClick={onClick}
		>
			{props.data.icon === undefined ? (
				<>{props.data.label}</>
			) : (
				<NavbarIcon data={props.data} />
			)}
		</Button>
	);
};

export default ResponsiveNavbarItem;
