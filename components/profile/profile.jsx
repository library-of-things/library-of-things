import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';
import Product from '../itemList/itemList'
import UserAvatar from '../user-avatar';
import { useUser } from '@supabase/auth-helpers-react';

const MyProfile = () => {
	const user = useUser()
  return (
    <>
				<Box>
				<UserAvatar userId= {user.id}/>
					<Typography>Transactions: ${`transactionNumber`}</Typography>
					<Typography>Location: ${`location`}</Typography>
				</Box>

				<Box>
					<Typography>Hi, I am ${`userName`}</Typography>
					<Stack>
						<Typography>Bio: ${`bioInfo`}</Typography>
						<Typography>Reviews</Typography>
						<Typography>Location</Typography></Stack>
				</Box>

				<Box>
					<Box>
						{/* <Product /> */}
					</Box>
				</Box>
    </>
  );
};

export default MyProfile;