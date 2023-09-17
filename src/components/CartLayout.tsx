"use client";
import { Box, Grid, Typography, Button, Checkbox } from "@mui/material";
import React from "react";

import { CartInfo } from "@/components";
interface ICartLayout {
  children: React.ReactNode;
}

const CartLayout: React.FC<ICartLayout> = ({ children }) => {
  return (
    <Box>
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        {/* Title */}
        <Grid item xs={12} mt={2} sx={{ borderBottom: "1px solid #000" }}>
          <Typography variant="h5">Your Cart</Typography>
        </Grid>
        {/* Cart item */}
        <Grid item xs={9}>
          {children}
        </Grid>
        {/* Cart info */}
        <CartInfo />
      </Grid>
    </Box>
  );
};

export default CartLayout;
