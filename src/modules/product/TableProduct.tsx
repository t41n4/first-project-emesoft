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
import { useAppSelector } from "@/redux/hooks";
import { displayDataSelector } from "@/redux/selector/selector";
import { IProduct2 } from "@/common/types";

const TableProduct = () => {
  const displayData = useAppSelector(displayDataSelector);

  return (
    <>
      <TableContainer
        component={Paper}
        className="w-full tableProduct"
        data-testid="tableProduct"
      >
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
            {displayData.length === 0 ? (
              <span>No data available</span>
            ) : (
              displayData.map((product: IProduct2, index: number) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableProduct;
