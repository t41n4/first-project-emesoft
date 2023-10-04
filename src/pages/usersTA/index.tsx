import { IUser } from "@/common/types";
import * as React from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { CSSProperties } from 'react'; // Thêm import này
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
interface UsersProps  {
    users:IUser[]
}
interface StyledTableCellProps {
  customStyles: {
    backgroundColor: string;
    color: string;
    fontSize:string;
    fontWeight:string;
  };
}
const StyledTableCell = styled(TableCell)<StyledTableCellProps>(({customStyles}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: customStyles.backgroundColor,
    color:customStyles.color ,
    fontSize:20,
    fontWeight:600
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: customStyles.fontSize,
    fontWeight:customStyles.fontWeight
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const tableContainerStyles : CSSProperties = {
  maxHeight: '400px', // Đặt giá trị max-height tại đây
  overflowY: 'auto', // Hiển thị thanh cuộn theo chiều dọc khi cần
};
export default function Users({ users }: UsersProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="60%"
      margin="auto"
      marginTop="100px"
      bgcolor="white" // Background màu trắng
      
    >
    <TableContainer component={Paper} style={tableContainerStyles}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18px',fontWeight:'500',}}>ID</StyledTableCell>
          <StyledTableCell  customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18px',fontWeight:'500',}}>User Name</StyledTableCell>
          <StyledTableCell  customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18px',fontWeight:'500',}}>Email</StyledTableCell>
          <StyledTableCell  customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18px',fontWeight:'500',}}>First Name</StyledTableCell>
          <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18px',fontWeight:'500',}}>Last Name</StyledTableCell>
          </TableRow>
        </TableHead>
       <TableBody>
       {users.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18',fontWeight:'600',}} >
                {row.id}
              </StyledTableCell>
              <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18',fontWeight:'600',}} align="left">{row.username}</StyledTableCell>
              <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18',fontWeight:'600',}} align="left">{row.email}</StyledTableCell>
              <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18',fontWeight:'600',}} align="left">{row.name.firstname}</StyledTableCell>
              <StyledTableCell customStyles={{backgroundColor: '#04878A',color: 'white',fontSize:'18',fontWeight:'600',}} align="left">{row.name.lastname}</StyledTableCell>
            </StyledTableRow>
          ))}
       </TableBody>
      </Table>
    </TableContainer>
    </Box>
    
  );
}
export async function getServerSideProps() {
  const response = await axios.get('https://fakestoreapi.com/users');
  const users: IUser[] =response.data;
  return {
    props: {
      users,
    },
  };
}
