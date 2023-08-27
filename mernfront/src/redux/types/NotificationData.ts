import { AlertColor } from '@mui/material/Alert';

export interface NotificationData {
	id: string;
	severity: AlertColor;
	message: string;
}
