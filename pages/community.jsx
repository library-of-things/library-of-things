// import { Container } from '@mui/material';
import DrawerAppBar from '../components/appBar';
import Product from '../components/card/card';
import cardData from '../components/card/cardData';
import { Grid } from '@mui/material';
import { useState } from 'react';
// import CardActionArea from '@mui/material/CardActionArea';


export default function Home() {
	return (
    <>
					<DrawerAppBar />
				<Grid container>
					{cardData.map(product => {
						return (
						<Grid item key={product.id}>	
							<Product cardData={product}/>
						</Grid>	
					)})
						}
				</Grid>	
    </>
  );
}