import { CartItem, CartInfo, QuantityInput } from "@/components";
import { useCart } from "@/context";
import {
  IconButton,
  CardMedia,
  Typography,
  Grid,
  Box,
  Checkbox,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CartPage = () => {
  const { carts, addToCart, removeFromCart } = useCart();

  return (
    <Box className="flex p-4 flex-row-reverse">
      {/* Cart info */}
      <CartInfo />
      {/* Cart Item */}
      <Grid
        container
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <CartItem dataCarts={carts} />
      </Grid>
    </Box>
  );
};
export default CartPage;
