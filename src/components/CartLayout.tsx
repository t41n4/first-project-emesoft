"use client";
import { Box, Grid, Typography, Button, Checkbox } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

interface ICartLayout {
  children: React.ReactNode;
}

const StyledButton = styled(Button)(
  ({ theme }) => `
  width: 100%;
  background: "#000";

  &:hover {
   
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

const CartLayout: React.FC<ICartLayout> = ({ children }) => (
  <Box>
    <Grid container>
      {/* Title */}
      <Grid item xs={12} mt={2} sx={{ borderBottom: "1px solid #000" }}>
        <Typography variant="h5">Your Cart</Typography>
      </Grid>
      {/* Cart item */}
      <Grid item xs={9}>
        {children}
      </Grid>
      {/* Cart info */}
      <Grid
        item
        sx={{
          padding: "16px",
          height: "225px",
          width: "100%",
          borderBottom: "1px solid #000",
        }}
        xs={3}
      >
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Total:
          </Typography>
          <Typography variant="h5" sx={{ marginLeft: "10px" }}>
            20000$
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "18px" }}>
            Shipping fees will be calculated at checkout.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "18px" }}>
            <Checkbox />I agree with the above information
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="bg-blue-500 hover:bg-blue-700 mb-3 ]"
            variant="contained"
          >
            Pay
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);
export default CartLayout;
