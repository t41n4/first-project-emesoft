import {
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useCart } from "@/context";

interface IDetailProductProps {
  openDialog: boolean;
  setOpenDialog: any;
}
const DetailProduct = ({ openDialog, setOpenDialog }: IDetailProductProps) => {
  const { productDetail } = useCart();
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">View Detail Product</DialogTitle>
      <DialogContent>
        {productDetail === null ? (
          ""
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Product Name
                  </TableCell>
                  <TableCell align="left">
                    {productDetail.productName}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Price
                  </TableCell>
                  <TableCell align="left">{productDetail.price}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Category
                  </TableCell>
                  <TableCell align="left">
                    {productDetail.categories?.join()}
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
                            productDetail.picture
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
                      {productDetail.detailPictures ? (
                        productDetail.detailPictures.map((item) => (
                          <ImageListItem>
                            <img
                              src={URL.createObjectURL(item)}
                              loading="lazy"
                            />
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailProduct;
