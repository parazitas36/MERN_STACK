import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from './reducers/CartReducer';
import { NotificationsReducer } from './reducers/NotificationsReducer';
import { AccountReducer } from './reducers/AccountReducer';

const store = configureStore({
	reducer: {
		cartState: CartReducer,
		notificationsState: NotificationsReducer,
		accountState: AccountReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
