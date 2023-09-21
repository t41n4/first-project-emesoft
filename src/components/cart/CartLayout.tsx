"use client";
import { Box } from "@mui/material";
import React from "react";
interface ICartLayout {
  children: React.ReactNode;
}

const CartLayout: React.FC<ICartLayout> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default CartLayout;
