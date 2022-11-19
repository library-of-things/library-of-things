import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { SettingsInputComponent } from '@mui/icons-material';
import { CardActionArea } from '@mui/material';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import cardData from '../card/cardData';


const Product = ({ cardData }) => {
	console.log(cardData)
  return (
		<>
			<CardActionArea>
				<Card style={{ height: 350, width: 350, }}>
					<CardMedia
						component='img'
						alt='white trailer'
						height='350'
						image='https://images.unsplash.com/photo-1499147463149-adc471bbc639?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
						/>
				</Card>
					<CardContent>
						<Typography gutterBottom variant='h5' component='div'>
							{cardData.name}
						</Typography>
						<Typography variant='body2' color='secondary'>
							{cardData.description}
						</Typography>
					</CardContent>
					<CardActions>
					</CardActions>
			</CardActionArea>		
		</>			
  );
}

export default Product;
