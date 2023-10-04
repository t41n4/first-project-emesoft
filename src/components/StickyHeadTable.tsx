import { IAddress, IName, IUser } from "@/common/user";
import { columns } from "@/constant/columns";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import usePagination from "../hooks/usePagination";

function createData(
  id: number,
  email: string,
  username: string,
  password: string,
  name: IName,
  address: IAddress,
  phone: number
): IUser {
  return { id, email, username, password, name, address, phone };
}
interface IProps {
  data: IUser[];
}

const StickyHeadTable = (props: IProps) => {
  const { data } = props;
  const rowsPerPageOptions = [3, 5, 7];
  const rowsPerPageDefault = rowsPerPageOptions[0];
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageDefault);
  const [rows, setRows] = React.useState<IUser[]>([]);

  useEffect(() => {
    if (data.length === 0) return;
    else {
      const rows = data.map((user) =>
        createData(
          user.id,
          user.email,
          user.username,
          user.password,
          user.name,
          user.address,
          user.phone
        )
      );
      setRows(rows);
    }
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="uppercase"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const identify = column.id as keyof IUser;
                      const value = row[identify];
                      const displayValue =
                        typeof value === "object"
                          ? JSON.stringify(value)
                          : value;

                      return (
                        <TableCell
                          className="cursor-pointer"
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            console.log("row: ", row);
                            router.push(`/users/${row.id}`);
                          }}
                        >
                          {column.format ? column.format(value) : displayValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
