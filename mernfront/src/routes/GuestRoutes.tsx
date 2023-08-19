import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';

const GuestRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<MainPage />}
			/>
		</Routes>
	);
};

export default GuestRoutes;
