"use client";

import { IProduct } from "@/common";
import { useProductContext } from "@/context/ProductContext";
import usePagination from "@/hooks/usePagination";
import { Grid, Pagination } from "@mui/material";
import { Product } from "..";

const MyPagination: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  return (
    <div className="">
      
    </div>
  );
};

export default MyPagination;
