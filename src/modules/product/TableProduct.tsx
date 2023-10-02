import { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Popper,
  Fade,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCart } from "@/context";
import { formatNumber } from "@/utils";

const TableProduct = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { handleViewDetailProduct, productDetail } = useCart();
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopper((previousOpen) => !previousOpen);
  };
  //
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  // handle viewdetail
  const handleViewDetail = (id: number) => {
    setOpenDialog(true);
    handleViewDetailProduct(id);
  };
  const { listProduct } = useCart();
  return (
    <>
      <TableContainer component={Paper} className="w-full">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.map((product, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{formatNumber(product.price)}</TableCell>
                <TableCell>{JSON.stringify(product.categories)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    aria-describedby="message-delete-popper"
                    onClick={(event) => handleClick(event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="view"
                    onClick={() => handleViewDetail(product.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">View Detail Product</DialogTitle>
        <DialogContent>
          {productDetail === null ? (
            ""
          ) : (
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Name: {productDetail?.productName}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Category:{productDetail?.categories}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Price: {productDetail?.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardMedia
                className="h-36 object-contain mb-4"
                component="img"
                image={
                  productDetail.picture
                    ? URL.createObjectURL(productDetail.picture)
                    : ""
                }
                alt="green iguana"
              />
              <ImageList cols={3}>
                {productDetail.detailPictures === undefined
                  ? []
                  : productDetail.detailPictures.map((picture, index) => {
                      return (
                        <ImageListItem key={index}>
                          <img
                            src={URL.createObjectURL(picture)}
                            loading="lazy"
                            className="h-36"
                          />
                        </ImageListItem>
                      );
                    })}
              </ImageList>
            </Card>
          )}
        </DialogContent>
      </Dialog>
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
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    do you want to delete!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Yes</Button>
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
export default TableProduct;
