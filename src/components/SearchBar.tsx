import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { usePathname } from "next/navigation";

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

interface IProps {
  handleSearchTermChange: ((searchTerm: string) => void) | undefined;
}

const willSearchBarAppear = (pathname: string) => {
  switch (pathname.slice(1)) {
    case "shop":
      return true;
    case "cart":
      return true;
    // case "product":
    //   return true;
    case "users":
      return true;
    default:
      return false;
  }
};

const SearchBar = (props: IProps) => {
  const { handleSearchTermChange } = props;

  const pathname = usePathname();
  return (
    willSearchBarAppear(pathname) && (
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => {
              handleSearchTermChange?.(event.target.value);
            }}
          />
        </Search>
      </div>
    )
  );
};

export default SearchBar;
