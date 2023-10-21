import React from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import Product from '../components/Product';
import { IItemShortGetDto } from '../data/DTOs/item/ItemShortGetDto';
import { useFetch } from '../hooks/useFetch';
import { ItemEndpoints } from '../api/endpoints/ItemEndpoints';

const productsEndpoint = {
	endpoint: ItemEndpoints.Base,
};

const MainPage: React.FC = () => {
	const { data, error, statusCode, isLoading } = useFetch<IItemShortGetDto[]>(productsEndpoint);

	if (isLoading) {
		return (
			<Container sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress sx={{ marginY: 5 }} />
			</Container>
		);
	}

	return (
		<Container
			maxWidth={false}
			sx={{ maxWidth: 1480 }}
		>
			<Grid
				spacing={2}
				container
			>
				{data?.map((product) => (
					<Product
						key={product.id}
						data={product}
					/>
				))}
			</Grid>
		</Container>
	);
};

export default MainPage;
