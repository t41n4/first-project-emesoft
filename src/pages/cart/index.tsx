import {
  CartItem,
  CartInfo,
  QuantityInput,
  SkeletonCart,
  CartLayout,
  CartEmpty,
} from "@/components";
import { useCart } from "@/context";
import { useState } from "react";
import { Grid, Box, Pagination } from "@mui/material";

const CartPage = () => {
  const { carts, addToCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
                <CartItem dataCarts={carts} />
                <Grid
                  item
                  className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center"
                >
                  <Pagination count={3} page={2} />
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
