"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  PaletteColorOptions,
  Typography,
} from "@mui/material";
import { IProduct } from "./Product";

export default function ImgMediaCard({
  id,
  title,
  price,
  image,
  description,
  category,
  rating,
}: IProduct) {
  return (
    <Card
      sx={{ width: 360, height: 550, aspectRatio: 1 }}
      className="flex flex-col justify-between items-center"
    >
      <CardMedia
        component="img"
        sx={{ height: 360, objectFit: "contain" }}
        image={image}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price}$
        </Typography>
      </CardContent>

      <CardActions>
        <Button className="bg-blue-500 hover:bg-blue-700" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
