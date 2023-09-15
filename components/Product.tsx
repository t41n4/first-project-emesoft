"use client";

import {
  Grid
} from "@mui/material";
import { ImgMediaCard } from ".";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: object;
}


export default function Product({
  id,
  title,
  price,
  image,
  description,
  category,
  rating,
}: IProduct) {
  return (
    <Grid
      item
      className="relative aspect-square flex justify-center z-0"
      xs={3}
      key={id}
    >
      <ImgMediaCard
        {...{
          id,
          title,
          price,
          image,
          description,
          category,
          rating,
        }}
      ></ImgMediaCard>
    </Grid>
  );
}
