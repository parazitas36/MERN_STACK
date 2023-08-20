import React from 'react'
import { NavItem } from '../../data/types/NavItem'
import { Box, Tooltip } from '@mui/material';

interface Props {
    data: NavItem;
}

const NavbarIcon: React.FC<Props> = (props: Props) => {
  return (
    <Tooltip title={props.data.label}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{props.data.icon}</Box>
    </Tooltip>
  )
}

export default NavbarIcon