import { Grid, CardMedia, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const CartEmpty = () => {
  const router = useRouter();

  return (
    <Grid
      item
      className="border border-black col-span-4 flex justify-center items-center flex-col"
    >
      <CardMedia
        image="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-28/90/empty_cart-512.png"
        className="w-40 h-40"
      />
      <Typography variant="h5">Your Cart is empty</Typography>
      <Button
        onClick={() => router.push("/shop")}
        className="my-3 px-16 text-white bg-black hover:bg-[#E4E6E7] hover:text-black "
      >
        Goto Shop
      </Button>
    </Grid>
  );
};
export default CartEmpty;
