import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from './reducers/CartReducer';
import { NotificationsReducer } from './reducers/NotificationsReducer';

const store = configureStore({
	reducer: {
		cartState: CartReducer,
		notificationsState: NotificationsReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
