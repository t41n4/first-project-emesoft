import { useState } from "react";
import {
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
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProductContext2 } from "@/context";
import { formatNumber } from "@/utils";
import { PopperDelete, UpdateProduct, DetailProduct } from "@/modules";
interface IDataDeleteProduct {
  id: number;
  productName: string;
}
const TableProduct = () => {
  const [openDialog, setOpenDialog] = useState(false);
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

  const { displayData, handleSearchTermChange } = useProductContext2();

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
            {displayData.map((product, index) => (
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
                <TableCell
                  align="center"
                  className="text-base flex justify-center"
                >
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
                  <DetailProduct id={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
