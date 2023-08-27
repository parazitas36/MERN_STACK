import { NotificationData } from '../types/NotificationData';
import { ActionsEnum } from './ActionsEnum';
import { createAction } from '@reduxjs/toolkit';

export const ShowNotification = createAction<NotificationData>(ActionsEnum.ShowNotificationBar.toString());
export const HideNotification = createAction<NotificationData>(ActionsEnum.HideNotificationBar.toString());
