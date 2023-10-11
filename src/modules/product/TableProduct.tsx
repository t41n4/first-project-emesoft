import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Fade,
} from "@mui/material";

import { formatNumber } from "@/utils";
import { PopperDelete, UpdateProduct, DetailProduct } from "@/modules";
import { useSelector } from "react-redux";
import { IProduct2 } from "@/common/types";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);
const TableProduct = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // const { displayData, handleSearchTermChange } = useProductContext2();
  const displayData = useSelector((state: RootState) => {
    const newData = state.products2.listProduct.filter((product: IProduct2) => {
      return product.productName.includes(state.products2.searchText);
    });
    return newData;
  });
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
            {displayData.map((product: IProduct2, index: number) => (
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
                  <PopperDelete id={product.id} />
                  <UpdateProduct {...product} />
                  <DetailProduct id={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableProduct;
