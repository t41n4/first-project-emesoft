import { CartItem, CartInfo, QuantityInput, SkeletonCart } from "@/components";
import { useCart } from "@/context";
import { useState } from "react";
import {
  IconButton,
  CardMedia,
  Typography,
  Grid,
  Box,
  Checkbox,
  Button,
} from "@mui/material";

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

          <Grid
            container
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <CartItem dataCarts={carts} />
          </Grid>
        </>
      ) : (
        <SkeletonCart />
      )}
    </Box>
  );
};
export default CartPage;
