"use client";

import { Box, Grid } from "@mui/material";
import React from "react";
import { IProductLayout } from "@/common";
import CategoryFilter from "./CategoryFilter";
import SmoothScroll from "../framer/SmoothScroll";

const ProductLayout: React.FC<IProductLayout> = ({ children }) => (
  <Box className="flex flex-row p-2 w-full justify-between ">
    <SmoothScroll>
      <Grid
        container
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {children}
      </Grid>
    </SmoothScroll>
  </Box>
);

export default ProductLayout;
