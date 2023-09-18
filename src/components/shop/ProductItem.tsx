"use client";

import { IProduct } from "@/common";
import { useCart } from "@/context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const scaleAnimation =
  "transform transition hover:scale-105  duration-500 ease-in-out";

export default function Product(props: IProduct) {
  const { addToCart } = useCart();
  return (
    <Card
      className={`flex flex-col justify-between items-center h-full border border-black hover:opacity-80 ${scaleAnimation}`}
    >
      <CardMedia
        component="img"
        className="h-[50%] object-contain p-5 object-center"
        image={props.image}
      />

      <CardContent>
        <Typography
          gutterBottom
          className="text-sm text-start overflow-hidden line-clamp-3"
        >
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.price}$
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          className="bg-blue-500 hover:bg-blue-700 mb-3 font-sans-semibold"
          variant="contained"
          onClick={() => {
            addToCart({
              id: props.id,
              image: props.image,
              name: props.title,
              price: props.price,
              quantity: 1,
            });
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
