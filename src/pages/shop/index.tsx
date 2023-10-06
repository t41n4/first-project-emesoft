import { IProduct } from "@/common";
import { CategoryFilter, PriceFilter, Product, ProductLayout } from "@/modules";
import { useProductContext } from "@/context/ProductContext";
import { Grid, Skeleton, Stack } from "@mui/material";
import Image from "next/image";

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
        // loading="lazy"
        sizes="100% 100%"
        priority={true}
        width={200}
        height={50}
      />
      <h1 className="text-3xl font-bold">No Product Found</h1>
    </div>
  );
};

const Page = () => {
  const { displayData, products, paginateData } = useProductContext();

  console.log("products: ", products);

  return (
    <div className="p-5 flex flex-row">
      <div className="flex flex-col p-2 sticky h-screen top-[4.75rem] left-[1.5rem]">
        <div className="CategoryFilter ">
          <CategoryFilter />
        </div>
        <div className="PriceFilter">
          <PriceFilter />
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
        ) : displayData.length ? (
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
