// import { Container } from '@mui/material';
import DrawerAppBar from '../components/appBar';
import Product from '../components/card/card';
import cardData from '../components/card/cardData';
import { useState } from 'react';
import {Grid, styled, Box, Modal } from "@mui/material";
import { AddBoxSharp } from '@mui/icons-material';
import ShowItemModal from '.././components/modal/modal';
// import CardActionArea from '@mui/material/CardActionArea';



export default function Home() {
	return (
    <>
			<ShowItemModal/>
					<DrawerAppBar />
				<Grid 
				paddingLeft= "0"
				container spacing={2} 
				display="flex"
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				>
					{cardData.map(product => {
						return (
						<Box
						padding= "1vw"
						item key={product.id} xs={12} sm={6} md={4}  xl={3}
						alignItems="center"
						justifyItems="center">
							<Product cardData={product}/>
						</Box>	
						)})
					}
				</Grid>	
    </>
  );
}