"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { CartItem } from "@/components";

import { fetchCart, useFetchProductsByID } from "@/hooks";
import { IProduct, IProductItem } from "@/common";

const Cart = () => {
  const [productData, setProductData] = useState<Array<IProduct>>([]);

  // Call api cart
  const callApiCart = async () => {
    const cartData = await fetchCart();
    console.log("cartData: ", cartData);

    if (cartData) {
      const newData: any[] | ((prevState: IProduct[]) => IProduct[]) = [];
      cartData.forEach(async (item: IProductItem) => {
        const productItem = await useFetchProductsByID(item.productId);
        newData.push(productItem);
      });
      setProductData(newData);
    }
  };

  useEffect(() => {
    callApiCart();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid xs={9} container>
          <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }}>
            <Grid container>
              {productData ? (
                productData.map((product: IProduct, index: number) => (
                  <CartItem key={index} {...product} />
                ))
              ) : (
                <>Nothing</>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Cart;
