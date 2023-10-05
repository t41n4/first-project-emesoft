import { useAppDispatch } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";

const HeaderCart = () => {
  const dispatch = useAppDispatch();

  return (
    <Box className=" flex justify-between mb-1">
      <Typography variant="h4">Your cart</Typography>
      <div className="flex">{/* <AddProduct /> */}</div>
    </Box>
  );
};

export default HeaderCart;
