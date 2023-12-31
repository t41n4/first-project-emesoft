"use client";

import { IProduct } from "@/common";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/reducer/CartSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export const scaleAnimation =
  "transform transition hover:scale-[101%]  duration-500 ease-in-out";

export default function ProductItem(props: IProduct) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  //filter title to make it url friendly
  // only allow a-z, 0-9, - and _
  // remove all other characters
  // replace spaces with -
  // replace multiple - with single -
  const title = props.title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const slug = props.id;

  const handleClick = () => {
    router.push(`/shop/${slug}`);
  };

  return (
    <Card
      className={`flex flex-col justify-between items-center h-full border border-black hover:opacity-80 ${scaleAnimation}`}
    >
      <CardMedia
        onClick={handleClick}
        component="img"
        className="h-[50%] object-contain p-5 object-center  hover:cursor-pointer"
        image={props.image}
      />

      <CardContent>
        <Typography
          gutterBottom
          className="text-lg font-sans-bold text-start overflow-hidden line-clamp-3"
        >
          {props.title}
        </Typography>
        <Typography variant="h5" color="text.secondary" className="uppercase">
          {props.category}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {props.price}$
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          className="bg-blue-500 hover:bg-blue-700 mb-3 font-sans-semibold"
          variant="contained"
          onClick={() => {
            dispatch(
              addToCart({
                id: props.id,
                image: props.image,
                name: props.title,
                price: props.price,
                quantity: 1,
              })
            );
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
