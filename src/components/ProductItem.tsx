"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

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
    <Card className="flex flex-col justify-between items-center h-full  border border-black">
      <CardMedia
        component="img"
        className="h-[30vh] object-contain p-5"
        image={image}
      />

      <CardContent>
        <Typography
          gutterBottom
          className="text-sm text-start overflow-hidden line-clamp-3"
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price}$
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          className="bg-blue-500 hover:bg-blue-700 mb-3"
          variant="contained"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
// overflow: "hidden",
//             textOverflow: "ellipsis",
//             display: "-webkit-box",
//             WebkitLineClamp: "2",
//             WebkitBoxOrient: "vertical",
