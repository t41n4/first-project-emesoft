import { Product } from "@/components";
import { IProduct } from "@/components/Product";
import Catergory from "@/components/Category";
import { fetchProducts } from "@/constant/products";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const errorProduct: IProduct = {
  id: 1,
  title: "abc",
  price: 30,
  image: "Error",
  description: "Error",
  category: "Error",
  rating: Object(),
};

const Page =  () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        console.log("data: ", data);
        setProducts(data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="flex flex-row p-2 w-full justify-between">
      {/* <Catergory /> */}
      <Grid container columns={{ xs: 12 }} spacing={1}>
        {products.map((product: IProduct, index: any) => (
          <Product key={index} {...product} />
        ))}
        <Product {...errorProduct} />
      </Grid>
    </Box>
  );
};

export default Page;
