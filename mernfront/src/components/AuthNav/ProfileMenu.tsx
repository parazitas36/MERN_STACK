import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps, Typography } from "@mui/material"
import React from "react"
import { AccountState } from "../../redux/types/AccountState"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Emit } from "../../helpers/EventHandler";
import { Events } from "../../helpers/Events";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoggedOut } from "../../redux/actions/AccountActions";
import { StatusCodes } from "../../data/enums/StatusCodes";

interface Props {
    accountState: AccountState | null;
}

export const Profile = ({ accountState }: Props) => {
    const dispatch = useAppDispatch();

    const logout = async (event: React.MouseEvent<HTMLElement>) => {
        if (!accountState?.accountInfo) {
            return;
        }

        const url = `${process.env.API_URL as string}/auth/logout`;
        const response = await fetch(url, {
            credentials: 'include',
        });


        if (response.status === StatusCodes.OK) {
            Emit(Events.ClosePoppers);
            dispatch(LoggedOut());
        }
    };

    return (
        <Box sx={BoxStyle}>
            <AccountCircleIcon sx={{ fontSize: 64, color: 'grey', marginTop: 2 }} />
            <Typography variant='h6'>
                {`${accountState?.accountInfo?.name} ${accountState?.accountInfo?.surname}`}
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LocalMallIcon sx={{ fontSize: 30, color: 'common.black' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary='Orders' 
                            sx={{ color: 'common.black' }} 
                            primaryTypographyProps={{
                                fontWeight: '500'
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon sx={{ fontSize: 30, color: 'error.dark' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary='Logout' 
                            sx={{ color: 'error.dark' }} 
                            primaryTypographyProps={{
                                fontWeight: '500'
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

const BoxStyle: SxProps = {
    display: 'flex',
    backgroundColor: 'background.paper',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: 200,
}