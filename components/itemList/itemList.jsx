/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import cardData from './cardData';
import Container from '@mui/material/Container'; // Grid version 2
import Link from 'next/link';
import { ButtonBase } from '@mui/material';


export default function Product(){
	return (
		<Container
			container spacing={2}
			xs={12} sm={6} md={4}  xl={3}
			padding= "1vw"
			alignItems="center"
			justifyItems="center">
			
			<ImageList 
				gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}>
				{cardData.map((item) => (

				<ButtonBase key={item._id} component={Link}  href='/items/_id'>

					<ImageListItem sx={{ height: '100% !important' }} key={item.img} style={{ borderRadius: '5' }}>

						<img
							src={`${item.img}?w=248&fit=crop&auto=format`}
							srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
							alt={cardData.name}
							loading="lazy"
						/>

					<ImageListItemBar
							title={item.name}
							subtitle={<span>by: {item.description}</span>}
							position="below"
							sx={{
								background:
									'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
							}}
						/>

					</ImageListItem>
				</ButtonBase>	
				))}
			</ImageList>
		</Container>	
	);
}