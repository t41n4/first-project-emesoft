import { IProduct } from "@/common";
import { Product, ProductLayout } from "@/components";
import CategoryFilter from "@/components/shop/CategoryFilter";
import PriceFilter from "@/components/shop/PriceFilter";
import { useProductContext } from "@/context/ProductContext";
import { Grid, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import { use, useEffect } from "react";

const SkeletonItem = () => {
  return (
    <Stack>
      <Skeleton className="flex min-h-[40vh] w-full" variant="rectangular" />
      <Skeleton className="min-h-[5vh]" variant="text" />
      <Skeleton className="min-h-[5vh]" variant="text" />
    </Stack>
  );
};

const ProductEmpty = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Image
        src="https://www.emesoft.net/wp-content/uploads/2023/06/EMESOFT-Logo-Full-Horizontal-.png"
        alt="EMESOFT-Logo-Full-Horizontal"
        title="EMESOFT-Logo-Full-Horizontal"
        loading="lazy"
        width={200}
        height={50}
      />
      <h1 className="text-3xl font-bold">No Product Found</h1>
    </div>
  );
};

const Page = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const { filteredProducts, products, paginateData } = useProductContext();

  // useEffect(() => {
  //   paginateData.jump(1);
  // }, [paginateData]);

  return (
    <div className="p-5 flex flex-row">
      <div className="flex flex-col p-2 sticky h-screen top-[4.75rem] left-[1.5rem]">
        <div className="CategoryFilter">
          <div>
            <CategoryFilter />
          </div>
        </div>
        <div className="PriceFilter">
          <div>
            <PriceFilter />
          </div>
        </div>
      </div>
      <div className="Content flex w-full">
        {!products.length ? (
          <ProductLayout>
            {[...Array(20)].map((_, index) => (
              <Grid item key={index}>
                <SkeletonItem />
              </Grid>
            ))}
          </ProductLayout>
        ) : filteredProducts.length ? (
          <ProductLayout>
            {paginateData.currentData().map((product: IProduct) => (
              <Grid item key={product.id}>
                <Product {...product} />
              </Grid>
            ))}
          </ProductLayout>
        ) : (
          <ProductEmpty />
        )}
      </div>
    </div>
  );
};

export default Page;
