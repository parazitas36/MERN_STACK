import React, {useEffect, useId, useState} from 'react';
import { Container, Grid } from '@mui/material';
import Product from '../components/Product';
import { IItemShortGetDto } from '../data/DTOs/item/ItemShortGetDto';

const MainPage: React.FC = () => {
	const [products, setProducts] = useState<IItemShortGetDto[]>([]);

	useEffect(() => {
		(async() => {
			const resp = await fetch('http://localhost:8080/items');
			const items: IItemShortGetDto[] = await resp.json();
			setProducts(items)
		})()
		
	}, [])
	

	return (
		<Container
			maxWidth={false}
			sx={{ maxWidth: 1480 }}
		>
			<Grid
				spacing={2}
				container
			>
				{products.map((product, i) => (
					<Product key={i} data={product} />
				))}
			</Grid>
		</Container>
	);
};

export default MainPage;