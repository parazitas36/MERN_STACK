import { NotificationsState } from './../types/NotificationsState';
import { HideNotification, ShowNotification } from '../actions/NotificationsActions';
import { Action } from '../types/Action';
import { createReducer } from '@reduxjs/toolkit';
import { NotificationData } from '../types/NotificationData';

const initialState: NotificationsState = {
	notifications: [],
};

export const NotificationsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(ShowNotification, (state, action) => {
			AddNewNotification(state, action);
		})
		.addCase(HideNotification, (state, action) => {
			RemoveNotification(state, action);
		});
});

function AddNewNotification(state: NotificationsState, action: Action<NotificationData>): void {
	if (action.payload !== undefined) {
		state.notifications.push(action.payload);
	}
}

function RemoveNotification(state: NotificationsState, action: Action<NotificationData>): void {
	if (action.payload !== undefined) {
		state.notifications = state.notifications.filter((notification) => notification.id !== action.payload?.id);
	}
}
