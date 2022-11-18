import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import cardData from '../card/cardData';

const Product = () => {
  return (
	<Container>
		<Grid container spacing={5} justify="center">		
			<Grid item>	
				<Card style={{ height: 350, width: 350, }}>

					<CardMedia
						component='img'
						alt='white trailer'
						height='140'
						image='https://images.unsplash.com/photo-1499147463149-adc471bbc639?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='div'>
							{cardData.name}
						</Typography>
						<Typography variant='body2' color='secondary'>
							{cardData.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='small'>Share</Button>
						<Button size='small'>Learn More</Button>
					</CardActions>
				</Card>
			</Grid>	
		</Grid>
	</Container>			
  );
}

export default Product;
