import { Product } from "@/app/components";
import { IProduct } from "@/app/components/Product";
import { Box, Grid } from "@mui/material";
import { useFetchProducts } from "@/";

const Page = async () => {
  const products = await useFetchProducts();

  return (
    <Box className="flex flex-row p-2 w-full justify-between">
      {/* <Catergory /> */}
      <Grid container columns={{ xs: 12 }} spacing={1}>
        {products.map((product: IProduct, index: any) => (
          <Product key={index} {...product} />
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
