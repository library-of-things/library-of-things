import DrawerAppBar from '../components/appBar';
import Product from '../components/card/card';
import cardData from '../components/card/cardData';
// import CardActionArea from '@mui/material/CardActionArea';


export default function Home() {
  return (
    <>
      <DrawerAppBar />
			{cardData.map(product => (
			<Product key = {product.id} {... product}/>
			))
			}
    </>
  );
}