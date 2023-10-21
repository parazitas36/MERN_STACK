import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';
import Auth from '../features/Auth';

const GuestRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<MainPage />}
			/>
			<Route
				path="/cart"
				element={<CartPage />}
			/>
			<Route
				path="/auth/:type?"
				element={<Auth />}
			/>
			<Route element={<MainPage />} />
		</Routes>
	);
};

export default GuestRoutes;
