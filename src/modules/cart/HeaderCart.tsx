import { Box, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "@/context";
import { AddProduct } from "@/modules";
import { useAppDispatch } from "@/redux/hooks";
import { filterSearch } from "@/redux/reducer/CartSlice";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#FFF",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginLeft: 0,
  marginRight: "16px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const HeaderCart = () => {
  const dispatch = useAppDispatch();

  return (
    <Box className=" flex justify-between mb-1">
      <Typography variant="h4">Your cart</Typography>
      <div className="flex">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => {
              dispatch(filterSearch(event.target.value));
            }}
          />
        </Search>
        <AddProduct />
      </div>
    </Box>
  );
};

export default HeaderCart;
