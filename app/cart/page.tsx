"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { CartItem } from "@/components";
import { fetchProducts, fetchProductsByID } from "@/constant/products";
import { fetchCart } from "./callApiCart";
import { IProduct } from "@/components/Product";

export interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ICart {
  id: number;
  userId: number;
  date: string; // Assuming date is a string in ISO 8601 format (e.g., "2020-10-10")
  products: IProductItem[];
}

interface IProductItem {
  productId: number;
  quantity: number;
}

interface MyComponentProps {
  initialData: string[]; // Define the prop with an initial array of strings
}

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);

  // Call api cart
  const callApiCart = async () => {
    const cartData = await fetchCart();
    if (cartData) {
      setCartData(cartData);
    }
  };

  const callProduct = async () => {
    // const productData = await fetchProductsByID();
    if (cartData) {
      cartData.forEach(async (item: IProductItem) => {
        const productItem = await fetchProductsByID(item.productId);
        const newData = [...productData, productItem];
        setProductData(newData);
      });
    }
  };

  useEffect(() => {
    callApiCart();
    callProduct();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid xs={9} container>
          <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }}>
            <Grid container>
              {productData.map((product: IProduct, index: number) => (
                <CartItem key={index} {...product}></CartItem>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Cart;
