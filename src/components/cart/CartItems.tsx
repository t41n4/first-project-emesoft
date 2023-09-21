import { ICartItem } from "@/common/types";
import { QuantityInput } from "@/components";
import { useCart } from "@/context";
import { formatNumber } from "@/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  CardMedia,
  Grid,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
  Avatar,
} from "@mui/material";

const CartItems = (props: { dataCarts: ICartItem[] }) => {
  const { dataCarts } = props;
  const { removeFromCart } = useCart();
  console.log("check dataCart", dataCarts);

  return dataCarts.map((cart) => {
    return (
      <Grid item key={cart.id}>
        <Card>
          <CardHeader
            action={
              <IconButton
                className="mx-1"
                onClick={() => removeFromCart(cart.id)}
              >
                <HighlightOffIcon />
              </IconButton>
            }
            className="p-0"
          />
          <CardActionArea>
            <CardMedia
              component="img"
              image={cart.image}
              alt="green iguana"
              className="h-72 object-contain"
            />
            <CardContent className="text-center py-2">
              <Typography
                gutterBottom
                variant="h5"
                className="whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {cart.name}
              </Typography>
              <Typography>{formatNumber(cart.price, cart.quantity)}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className="flex justify-center mb-1">
            <QuantityInput id={cart.id} value={cart.quantity} />
          </CardActions>
        </Card>
      </Grid>
    );
  });
};

export default CartItems;
