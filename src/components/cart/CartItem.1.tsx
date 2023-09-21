import { Box, Grid, CardMedia, Typography, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { QuantityInput } from "@/components";
import { useCart } from "@/context";
import { ICartItem } from "@/common/types";
import { useRouter } from "next/router";
import { formatNumber } from "./CartItem";

export const CartItem = (props: { dataCarts: ICartItem[] }) => {
  const { dataCarts } = props;
  const { carts, addToCart, removeFromCart } = useCart();
  const router = useRouter();
  console.log("check dataCart", dataCarts);

  return (
    <>
      {dataCarts.map((cart) => {
        return (
          <Grid item className="border border-black bg-[#FFF]">
            <Box className="  flex flex-col text-center">
              <Box className="flex flex-row-reverse">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => removeFromCart(cart.id)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Box>
              <CardMedia
                component="img"
                alt="green iguana"
                className="h-60 object-contain px-3 rounded"
                image={cart.image}
              />
              <Typography className="my-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {cart.name}
              </Typography>
              <QuantityInput value={cart.quantity} id={cart.id} />
              <Typography className="my-2 font-normal" variant="h6">
                {formatNumber(cart.price, cart.quantity)}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};
