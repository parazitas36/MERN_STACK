import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';

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
		</Routes>
	);
};

export default GuestRoutes;
