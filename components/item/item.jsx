import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';
import { Description } from '@mui/icons-material';


const Item = ({ cardData }) => {
  return (
    <>
			<Box>
				<Typography>${`itemName`}</Typography>
				<Stack><Typography>Reviews</Typography><Typography>Location</Typography></Stack>
			</Box>

				<Card sx={{ height: 250, width: 350 }}>
					<CardMedia
						component='img'
						alt='white trailer'
						height='250'
						image='https://images.unsplash.com/photo-1499147463149-adc471bbc639?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
					/>
				</Card>
				<Box>
					<Box>
						<Typography>Item hosted by ${`ownerName`}</Typography>
						<Typography>Description: ${`Description`}</Typography>
						<Typography>Condition: ${`condition`}</Typography>
						<Typography>Times Lent: ${`timesLent`}</Typography>
						<Typography>Availability: ${`availability`}</Typography>
						<Button>Contact Owner</Button>
					</Box>
					<Box>
						PROFILE PIC
					</Box>
				</Box>
    </>
  );
};

export default Item;