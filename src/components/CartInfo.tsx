import { Box, Grid, Typography, Button, Checkbox } from "@mui/material";
import { useCart } from "@/context";
import { useState } from "react";

const CartInfo = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [disableBtn, setDisableBtn] = useState(false);
  const sumPrice = () => {
    let total = 0;
    cart.map((cartItem) => {
      total += cartItem.quantity * cartItem.price;
    });
    return total;
  };

  const totalPriceCart = sumPrice();
  return (
    <Grid
      item
      sx={{
        padding: "16px",
        width: "100%",
      }}
      xs={3}
    >
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Total:
        </Typography>
        <Typography variant="h5" sx={{ marginLeft: "10px" }}>
          {totalPriceCart === 0 ? "00.00 $" : `${totalPriceCart} $`}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "18px" }}>
          Shipping fees will be calculated at checkout.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "18px" }}>
          <Checkbox
            onChange={(e) => {
              setDisableBtn(e.target.checked);
            }}
          />
          I agree with the above information
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          className="bg-blue-500 mt-6 hover:bg-blue-700 mb-3 ]"
          variant="contained"
          disabled={disableBtn ? false : true}
        >
          Pay
        </Button>
      </Grid>
    </Grid>
  );
};
export default CartInfo;
