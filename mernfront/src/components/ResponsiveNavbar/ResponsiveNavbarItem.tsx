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

	const shouldComponentOverrideOnClickOnBigScreen = (): boolean =>
		props.isInSmallScreen !== true && props.data.shouldComponentDisableRoute === true;

	const onClick = (): void => {
		if (!shouldComponentOverrideOnClickOnBigScreen()) {
			navigate(props.data.route);
		}
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
	}

	return (
		<Button
			variant="text"
			sx={{ color: 'white' }}
			onClick={onClick}
		>
			{props.data.component !== undefined ? (
				<>{props.data.component}</>
			) : props.data.icon === undefined ? (
				<>{props.data.label}</>
			) : (
				<NavbarIcon data={props.data} />
			)}
		</Button>
	);
};

export default ResponsiveNavbarItem;
