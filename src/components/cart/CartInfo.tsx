import { useCart } from "@/context";
import { sumPrice, formatNumber } from "@/utils";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";

const CartInfo = () => {
  const { carts } = useCart();
  const [disableBtn, setDisableBtn] = useState(true);

  const totalPriceCart = sumPrice(carts);
  return (
    <Box className="max-w-lg">
      <Box
        component="div"
        className="sticky top-[4.5rem] left-[3.5rem] pl-4 border border-black ml-4"
      >
        <Typography className="text-3xl font-normal mt-2">
          Total : {formatNumber(totalPriceCart)}
        </Typography>
        <Typography className="text-2xl my-4">
          Shipping fees are calculated at checkout
        </Typography>
        <Box className="text-2xl">
          <Checkbox
            className="w-0 h-0 "
            onChange={(event) => {
              setDisableBtn(!event.target.checked);
            }}
          />{" "}
          Agree with the above information
        </Box>

        <Box className="flex justify-center">
          <Button
            variant="contained"
            className="my-3 px-16  bg-black hover:bg-[#E4E6E7] hover:text-black "
            disabled={disableBtn}
          >
            Pay
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CartInfo;
