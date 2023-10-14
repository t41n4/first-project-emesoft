import {
  Box,
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
  Backdrop,
  Zoom,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Collapse } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { handleViewDetailProduct } from "@/redux/reducer/ProductSlice_2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
const DetailProduct = ({ id }: any) => {
  // const { productDetail, handleViewDetailProduct } = useProductContext2();
  const dispatch = useDispatch();
  const productDetail = useAppSelector(
    (state) => state.products2.detailProduct
  );

  const [open, setOpen] = useState(false);

  const handleViewDetail = (id: number) => {
    setOpen(true);
    dispatch(handleViewDetailProduct(id));
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="add-product inline relative">
      <Tooltip title="view detail product">
        <IconButton
          className="text-blue-600"
          aria-label="view"
          onClick={() => handleViewDetail(id)}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
        className=""
      >
        <Zoom in={open} timeout={500}>
          <Card className="w-[50vw] h-[100vh] overflow-y-scroll absolute top-0 right-0">
            <CardHeader
              action={
                <IconButton
                  aria-label="settings"
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 my-2 mr-4"
                >
                  <HighlightOffOutlinedIcon className="text-4xl mx-auto" />
                </IconButton>
              }
              className="p-0 flex-row-reverse"
              title="View Detail Product"
            />
            <CardContent>
              <TableContainer component={Paper} className="w-[50vw]">
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Product Name
                      </TableCell>
                      <TableCell align="left">
                        {productDetail?.productName}
                      </TableCell>
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
                            productDetail.detailPictures.map(
                              (item: File, index: number) => (
                                <ImageListItem key={index}>
                                  <img
                                    src={URL.createObjectURL(item)}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              )
                            )
                          ) : (
                            <></>
                          )}
                        </ImageList>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Zoom>
      </Backdrop>
    </div>
  );
};

export default DetailProduct;
