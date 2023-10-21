import React from 'react';
import { Box, Typography, SxProps } from '@mui/material';

interface AuthTabProps {
    text: string,
    side: 'left' | 'right',
    isSelected: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
}

const defaultTabStyle: SxProps = {
    width: '50%',
    py: 2,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
};

const leftTabStyle: SxProps = {
    ...defaultTabStyle,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: '15px',
};

const rightTabStyle: SxProps = {
    ...defaultTabStyle,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: '15px',
};

const AuthTab = (props: AuthTabProps) => {
    const boxStyle = props.side === 'left' ? leftTabStyle : rightTabStyle;

	return (
		<Box
			sx={{...boxStyle, backgroundColor: props.isSelected ? 'background.paper' : 'primary.main' }}
            onClick={props.onClick}
		>
            <Typography
                variant="h5"
                color={props.isSelected ? "primary.main" : "primary.contrastText"}
            >
                {props.text}
            </Typography>
		</Box>
	);
};

export default AuthTab;
