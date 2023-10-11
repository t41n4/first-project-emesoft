import { useCartContext } from "@/context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  IconButton,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useProductContext2 } from "@/context";
import { useState } from "react";
import {
  handleViewDetailProduct,
  handleDeleteProduct,
} from "@/redux/reducer/ProductSlice_2";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store/store";
const PopperDelete = ({ id }: any) => {
  // dispatch
  const dispatch = useDispatch();
  // seletor
  const dataDeleteProduct = useAppSelector(
    (state) => state.products2.detailProduct
  );
  // State
  // const { handleDeleteProduct } = useProductContext2();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPopper, setOpenPopper] = useState(false);
  const handleClickPopper = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(handleViewDetailProduct(id));
    setAnchorEl(event.currentTarget);
    setOpenPopper((previousOpen) => !previousOpen);
  };
  return (
    <>
      <Tooltip title="delete product">
        <IconButton
          aria-label="delete"
          aria-describedby="message-delete-popper"
          onClick={(event) => handleClickPopper(event)}
          className="text-red-600"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Popper
        id="message-delete-popper"
        open={openPopper}
        anchorEl={anchorEl}
        transition
        placement="left"
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent className="px-4 py-1">
                  <Typography
                    component="div"
                    className="text-base font-semibold"
                  >
                    Message
                  </Typography>
                  <Typography color="text.secondary">
                    do you want to delete {dataDeleteProduct?.productName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      setOpenPopper(false);
                      dispatch(handleDeleteProduct(dataDeleteProduct?.id));
                    }}
                  >
                    Yes
                  </Button>
                  <Button size="small" onClick={() => setOpenPopper(false)}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Fade>
          );
        }}
      </Popper>
    </>
  );
};

export default PopperDelete;
