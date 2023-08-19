import React from 'react';
import { Container, Grid } from '@mui/material';
import Product from '../components/Product';

const MainPage: React.FC = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7 ,8 ,10]
	return (
		<Container
			maxWidth={false}
			sx={{ maxWidth: 1480 }}
		>
			<Grid
        spacing={2}
				container
			>
			{arr.map(x => <Product />)}	
			</Grid>
		</Container>
	);
};

export default MainPage;
