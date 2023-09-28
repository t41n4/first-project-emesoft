import { useCart } from "@/context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/router";

export default function FloatingCartButton() {
  const { carts } = useCart();
  const router = useRouter();

  // canculate total quantity in cart
  const totalQuantity = carts.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  );

  return (
    <>
      {carts.length > 0 && ( // Only show the button if the cart is not empty
        <Box className="fixed bottom-5 right-5 z-[100] ">
          <Fab
            className="bg-blue-500 hover:bg-blue-700 text-white flex-col flex justify-center items-center  "
            aria-label="cart"
            onClick={() => {
              router.push("/cart");
            }}
          >
            <span className="leading-[15px]">{totalQuantity}</span>
            <ShoppingCartIcon />
          </Fab>
        </Box>
      )}
    </>
  );
}
