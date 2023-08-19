import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./reducers/CartReducer";

const store = configureStore({
  reducer: {
    cartState: CartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;