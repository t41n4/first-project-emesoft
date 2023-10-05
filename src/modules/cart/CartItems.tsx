import { QuantityInput } from "@/modules";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromCart } from "@/redux/reducer/CartSlice";
import { formatNumber } from "@/utils";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CartItems = (props: { dataCarts: any }) => {
  const { dataCarts } = props;
  const dispatch = useAppDispatch();
  return dataCarts.map((cart) => {
    return (
      <Grid item key={cart.id}>
        <Card>
          <CardHeader
            action={
              <IconButton
                className="mx-1"
                onClick={() => dispatch(removeFromCart(cart.id))}
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
