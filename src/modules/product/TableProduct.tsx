import { useCartContext } from "@/context";
import { DetailProduct, PopperDelete, UpdateProduct } from "@/modules";
import { formatNumber } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";
import { useState } from "react";
interface IDataDeleteProduct {
  id: number;
  productName: string;
}
const TableProduct = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { handleViewDetailProduct, productDetail, handleDeleteProduct } =
    useCartContext();
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataDeleteProduct, setDataDeleteProduct] =
    useState<IDataDeleteProduct>();
  const handleClickPopper = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    productName: string
  ) => {
    const dataDelete = {
      id,
      productName,
    };
    setDataDeleteProduct(dataDelete);

    setAnchorEl(event.currentTarget);
    setOpenPopper((previousOpen) => !previousOpen);
  };
  //

  // handle viewdetail
  const handleViewDetail = (id: number) => {
    setOpenDialog(true);
    handleViewDetailProduct(id);
  };
  const { listProduct } = useCartContext();
  return (
    <>
      <TableContainer component={Paper} className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="text-base font-semibold ">
                ID
              </TableCell>
              <TableCell align="center" className="text-base font-semibold">
                Product Name
              </TableCell>
              <TableCell align="center" className="text-base font-semibold">
                Price
              </TableCell>
              <TableCell align="center" className="text-base font-semibold">
                Category
              </TableCell>
              <TableCell align="center" className="text-base font-semibold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.map((product, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  className="text-base"
                >
                  {product.id}
                </TableCell>
                <TableCell align="center" className="text-base">
                  {product.productName}
                </TableCell>
                <TableCell align="center" className="text-base">
                  {formatNumber(product.price)}
                </TableCell>
                <TableCell align="center" className="text-base">
                  {product.categories?.join()}
                </TableCell>

                <TableCell align="center" className="text-base">
                  <Tooltip title="delete product">
                    <IconButton
                      aria-label="delete"
                      aria-describedby="message-delete-popper"
                      onClick={(event) =>
                        handleClickPopper(
                          event,
                          product.id,
                          product.productName
                        )
                      }
                      className="text-red-600"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <UpdateProduct id={product.id} />

                  <Tooltip title="view detail product">
                    <IconButton
                      className="text-blue-600"
                      aria-label="view"
                      onClick={() => handleViewDetail(product.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DetailProduct openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <PopperDelete
        openPopper={openPopper}
        setOpenPopper={setOpenPopper}
        anchorEl={anchorEl}
        dataDeleteProduct={dataDeleteProduct}
      />
    </>
  );
};
export default TableProduct;
