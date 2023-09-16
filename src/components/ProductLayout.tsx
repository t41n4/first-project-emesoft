"use client";

import { Box, Grid } from "@mui/material";
import React from "react";

interface ProductLayout {
  children: React.ReactNode;
}

const ProductLayout: React.FC<ProductLayout> = ({ children }) => (
  <Box className="flex flex-row p-2 w-full justify-between">
    <Grid
      container
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {children}
    </Grid>
  </Box>
);

export default ProductLayout;
