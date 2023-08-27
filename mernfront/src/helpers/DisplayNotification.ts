import { NotificationData } from '../redux/types/NotificationData';
import { HideNotification, ShowNotification } from '../redux/actions/NotificationsActions';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { CartState } from '../redux/types/CartState';
import { NotificationsState } from '../redux/types/NotificationsState';

const NOTIFICATION_APPEARANCE_DURATION_MS = 2000;

interface Props {
	dispatch: ThunkDispatch<any, any, any> & Dispatch<AnyAction>;
	notification: NotificationData;
}

export default function DisplayNotification(props: Props) {
	props.dispatch(ShowNotification(props.notification));

	setTimeout(() => props.dispatch(HideNotification(props.notification)), NOTIFICATION_APPEARANCE_DURATION_MS);
}
