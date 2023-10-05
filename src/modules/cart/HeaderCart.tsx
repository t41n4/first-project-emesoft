import { Box, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "@/context";
import { AddProduct } from "@/modules";
import { useAppDispatch } from "@/redux/hooks";
import { filterSearch } from "@/redux/reducer/CartSlice";

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
