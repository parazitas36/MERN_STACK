import React, { useId } from 'react';
import { ResponsiveNavbarProps } from './props/ResponsiveNavbarProps';
import ResponsiveNavbarItem from './ResponsiveNavbarItem';
import { Stack } from '@mui/material';

const ResponsiveNavbarItems = (props: ResponsiveNavbarProps) => {
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
			{props?.items?.map((item) => (
				<ResponsiveNavbarItem key={useId()} data={item} isInSmallScreen={props.isInSmallScreen || false} />
			))}
		</Stack>
	);
};

export default ResponsiveNavbarItems;
