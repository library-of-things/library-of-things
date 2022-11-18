import DrawerAppBar from './appBar';
import ImgMediaCard from './card/card';
import CardActionArea from '@mui/material/CardActionArea';

export default function Home() {
	return (
		<div>
		 <DrawerAppBar/>
		  <CardActionArea>
		 	 <ImgMediaCard/>
		  </CardActionArea>	
		</div>
	)
}
