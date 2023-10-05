"use client";

import { IProductLayout } from "@/common";
import { useProductContext } from "@/context/ProductContext";
import { Box, Grid, Pagination } from "@mui/material";
import React from "react";
import SmoothScroll from "../framer/SmoothScroll";

const ProductLayout: React.FC<IProductLayout> = ({ children }) => {
  const { paginateData, setPage, Page } = useProductContext();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("handleChange: ");
    setPage(value);
    paginateData.jump(value);

    window.scrollTo(0, 0);
  };
  return (
    <Box className="product-layout flex flex-col p-2 w-full justify-between ">
      <Grid
        container
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 "
      >
        {children}
      </Grid>
      <Pagination
        count={paginateData.maxPage}
        className="mt-5 flex w-full justify-center p-3 "
        size="large"
        page={Page}
        variant="outlined"
        showFirstButton={true}
        showLastButton={true}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ProductLayout;
