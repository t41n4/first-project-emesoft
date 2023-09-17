import { IProduct } from "@/common";
import { Product, ProductLayout } from "@/components";
import CategoryFilter from "@/components/shop/CategoryFilter";
import { useProductContext } from "@/context/ProductContext";
import { Grid, Skeleton, Stack } from "@mui/material";

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
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const {  filteredProducts } = useProductContext();

  return (
    <div className="p-5 flex flew-row">
      <div className="Category">
        <div className="p-2 sticky h-screen top-[4.75rem] left-[3.5rem]">
          <CategoryFilter />
        </div>
      </div>
      <div className="Content flex w-full">
        {!filteredProducts.length ? (
          <ProductLayout>
            {[...Array(20)].map((_, index) => (
              <Grid item key={index}>
                <SkeletonItem />
              </Grid>
            ))}
          </ProductLayout>
        ) : (
          <ProductLayout>
            {filteredProducts.map((product: IProduct, index: any) => (
              <Grid item key={index}>
                <Product {...product} />
              </Grid>
            ))}
          </ProductLayout>
        )}
      </div>
    </div>
  );
};

export default Page;
