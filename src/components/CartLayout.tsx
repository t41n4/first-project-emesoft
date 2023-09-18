"use client";
import { CartInfo, SkeletonCart } from "@/components";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
interface ICartLayout {
  children: React.ReactNode;
}

const CartLayout: React.FC<ICartLayout> = ({ children }) => {
  const [loading, setIsLoading] = React.useState(false);
  setTimeout(() => {
    setIsLoading(true);
  }, 1000);
  return (
    <Box>
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        {/* Title */}
        <Grid item xs={12} mt={2} sx={{ borderBottom: "1px solid #000" }}>
          <Typography
            className="text-left flex "
            variant="h5"
            sx={{ marginLeft: "16px" }}
          >
            Your Cart
          </Typography>
        </Grid>
        {/* Cart item */}
        {loading ? (
          <>
            <Grid item xs={12} md={9}>
              {children}
            </Grid>
            {/* Cart info */}
            <CartInfo />
          </>
        ) : (
          <>
            <SkeletonCart />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CartLayout;
