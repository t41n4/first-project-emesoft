import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { useProductContext2 } from "@/context";
import { useState } from "react";

const DetailProduct = ({ id }: any) => {
  const { productDetail, handleViewDetailProduct } = useProductContext2();
  const [open, setOpen] = useState(false);

  const handleViewDetail = (id: number) => {
    setOpen(true);
    handleViewDetailProduct(id);
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="add-product inline ">
      <Tooltip title="view detail product">
        <IconButton
          className="text-blue-600"
          aria-label="view"
          onClick={() => handleViewDetail(id)}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={open}
        onKeyDown={(event) => handleOnKeyDown(event)}
      >
        <Card className="w-[50vw] overflow-y-scroll">
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={() => setOpen(false)}>
                <HighlightOffOutlinedIcon className="text-4xl mr-4" />
              </IconButton>
            }
            className="p-0 flex-row-reverse"
            title="View Detail Product"
          />
        </Card>
        <TableContainer component={Paper} className="w-[50vw]">
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Product Name
                </TableCell>
                <TableCell align="left">{productDetail?.productName}</TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Price
                </TableCell>
                <TableCell align="left">{productDetail?.price}</TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Category
                </TableCell>
                <TableCell align="left">
                  {productDetail?.categories?.join()}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Main Image
                </TableCell>
                <TableCell>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={
                          productDetail?.picture
                            ? URL.createObjectURL(productDetail.picture)
                            : ""
                        }
                        alt="green iguana"
                        className="h-40 object-contain"
                      />
                    </CardActionArea>
                  </Card>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Detail Image
                </TableCell>
                <TableCell align="right">
                  <ImageList cols={4}>
                    {productDetail?.detailPictures ? (
                      productDetail.detailPictures.map((item, index) => (
                        <ImageListItem key={index}>
                          <img src={URL.createObjectURL(item)} loading="lazy" />
                        </ImageListItem>
                      ))
                    ) : (
                      <></>
                    )}
                  </ImageList>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>
    </div>
    // <Dialog
    //   open={openDialog}
    //   onClose={() => setOpenDialog(false)}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    // >
    //   <DialogTitle id="alert-dialog-title">View Detail Product</DialogTitle>
    //   <DialogContent>
    //     {productDetail === null ? (
    //       ""
    //     ) : (

    //     )}
    //   </DialogContent>
    // </Dialog>
  );
};

export default DetailProduct;
