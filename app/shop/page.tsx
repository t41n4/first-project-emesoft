import { Product } from "@/components";
import { IProduct } from "@/components/Product";
import Slider from "@/components/Slider";
import { fetchProducts } from "@/constant/products";
import {
  Box,
  Grid
} from "@mui/material";


const Page = async () => {
  const products = await fetchProducts();

  return (
    <Box className="flex flex-row p-2 w-full justify-between">
      <Slider />
      <Grid container columns={{ xs: 12 }} spacing={1}>
        {products.map((product: IProduct, index: any) => (
          <Product key={index} {...product} />
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
