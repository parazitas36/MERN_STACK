import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar, Stack } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { HideNotification } from '../../redux/actions/NotificationsActions';

const Notifications = () => {
	const notifications = useAppSelector((states) => states.notificationsState.notifications);
	const dispatch = useAppDispatch();

	return (
		<Snackbar open={notifications.length > 0}>
			<Stack sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, marginBottom: { xs: 7, sm: 6 } }}>
				{notifications?.map((notification) => {
					return (
						<MuiAlert
							variant="filled"
							onClose={() => dispatch(HideNotification(notification))}
							severity={notification.severity}
							sx={{ width: '100%' }}
						>
							{notification.message}
						</MuiAlert>
					);
				})}
			</Stack>
		</Snackbar>
	);
};

export default Notifications;
