import { IProduct } from "@/common";
import { Product, ProductLayout } from "@/components";
import FloatingCartButton from "@/components/FloatingCartBottom";
import SmoothScroll from "@/components/SmoothScroll";
import { fetchProducts } from "@/constant/products";
import { CartProvider } from "@/context/CartContext";
import { Grid, Skeleton, Stack } from "@mui/material";
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

const SkeletonItem = () => {
  return (
    <Stack>
      <Skeleton className="flex min-h-[40vh] w-full" variant="rectangular" />
      <Skeleton className="min-h-[5vh]" variant="text" />
      <Skeleton className="min-h-[5vh]" variant="text" />
    </Stack>
  );
};

const Page = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        console.log("data: ", data);
        setProducts(data);
        setIsLoading(!data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SmoothScroll>
      <div className="p-5">
        {isLoading ? (
          <ProductLayout>
            {[...Array(20)].map((_, index) => (
              <Grid item key={index}>
                <SkeletonItem />
              </Grid>
            ))}
          </ProductLayout>
        ) : (
          <ProductLayout>
            {products.map((product: IProduct, index: any) => (
              <Grid item className="">
                <Product key={index} {...product} />
              </Grid>
            ))}
          </ProductLayout>
        )}
      </div>
    </SmoothScroll>
  );
};

export default Page;
