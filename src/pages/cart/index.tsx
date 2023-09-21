import {
  CartItem,
  CartInfo,
  QuantityInput,
  SkeletonCart,
  CartEmpty,
} from "@/components";
import { useCart } from "@/context";
import { useState } from "react";
import { Grid, Box, Pagination } from "@mui/material";
import { usePagination } from "@/hooks";
const CartPage = () => {
  const { carts, addToCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentData, currentPage, maxPage, jump } = usePagination(carts, 8);

  // Handle change pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    jump(value);
    window.scrollTo(0, 0);
  };
  console.log("Current data", currentData);

  setTimeout(() => {
    setIsLoading(true);
  }, 1000);
  return (
    <Box className="flex p-4 flex-row-reverse">
      {isLoading ? (
        <>
          <CartInfo />

          {/* cart item */}
          <Grid
            container
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {carts.length === 0 ? (
              <CartEmpty />
            ) : (
              <>
                <CartItem dataCarts={currentData()} />
                <Grid
                  item
                  className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center"
                >
                  <Pagination
                    count={maxPage}
                    page={currentPage}
                    onChange={(event, value) => handleChange(event, value)}
                    size="large"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      ) : (
        <SkeletonCart />
      )}
    </Box>
  );
};
export default CartPage;
