import { Grid, CardMedia, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const CartEmpty = () => {
  const router = useRouter();

  return (
    <Grid
      container
      sx={{
        height: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardMedia
        image="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-28/90/empty_cart-512.png"
        sx={{ width: "150px", height: "150px" }}
      />
      <Typography variant="h5">Your Cart is empty</Typography>
      <Button onClick={() => router.push("/shop")}>Goto Shop</Button>
    </Grid>
  );
};
export default CartEmpty;
