import { Box, Grid, CardMedia, Typography, Button } from "@mui/material";
import { QuantityInput } from "@/components";
import { useCart } from "@/context";
import { ICartItem } from "@/common/types";
import { CartEmpty } from "@/components";

const CartItem = (props: ICartItem) => {
  const { dataCart } = props;
  const { cart, addToCart, removeFromCart } = useCart();
  // if (dataCart.length === 0) {
  //   console.log("Cart Roong");
  // } else {
  //   console.log(dataCart);
  // }
  // console.log("check data cart", dataCart);

  return (
    <Box>
      {dataCart.length === 0 ? (
        <CartEmpty />
      ) : (
        dataCart.map((data: ICartItem, index: number) => {
          return (
            <Grid container sx={{ borderBottom: "1px solid #000" }} key={index}>
              <Grid item xs={2} sx={{ padding: "16px" }}>
                <CardMedia
                  sx={{ height: "225px", width: "168px", objectFit: "contain" }}
                  image={data.image}
                  title="green iguana"
                />
              </Grid>
              <Grid item xs={7} sx={{ padding: "16px" }}>
                <Typography variant="h5">{data.name}</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "end",
                  padding: "16px",
                }}
              >
                <Grid item>
                  <Button
                    sx={{ background: "#000" }}
                    onClick={() => removeFromCart(data.id)}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    $ {data.price * data.quantity}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                <QuantityInput value={data.quantity} id={data.id} />
              </Grid>
            </Grid>
          );
        })
      )}
    </Box>
  );
};

export default CartItem;
