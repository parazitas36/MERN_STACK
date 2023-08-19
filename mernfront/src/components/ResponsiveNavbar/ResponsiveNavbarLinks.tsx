import React from 'react';
import { ResponsiveNavbarProps } from './props/ResponsiveNavbarProps';
import ResponsiveNavbarLinkItem from './ResponsiveNavbarLinkItem';
import { Stack } from '@mui/material';

const ResponsiveNavbarLinks = (props: ResponsiveNavbarProps) => {
    const shouldHide = (): boolean => {
        if (props.isInSmallScreen !== true) {
            return false;
        }

        return props.isMenuToggled === false;
    }
	return (
		<Stack
			spacing={2}
			direction={props.isInSmallScreen === true ? 'column' : 'row'}
            sx={{ display: shouldHide() ? 'none' : 'flex'}}
		>
			{props?.links?.map((linkItem) => (
				<ResponsiveNavbarLinkItem data={linkItem} />
			))}
		</Stack>
	);
};

export default ResponsiveNavbarLinks;
