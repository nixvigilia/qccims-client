"use client";

import CustomPagination from "@/components/CustomPagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14px",
}));

function CustomerOrderListTable({ data, mutate }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: "sm", overflow: "auto", width: "100%", minHeight: 0 }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="customer table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data?.map((customer, index) => (
              <StyledTableRow key={customer.id || index}>
                <StyledTableCell component="th" scope="row">
                  <Typography fontSize={"0.8rem"}>
                    {customer.companyName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography fontSize={"0.8rem"}>
                    {customer.address}{" "}
                  </Typography>
                </StyledTableCell>
                <TableCell>
                  <Chip
                    size="small"
                    icon={
                      customer.status === "ACTIVE" ? (
                        <CheckRoundedIcon />
                      ) : (
                        <BlockIcon />
                      )
                    }
                    label={customer.status.toLowerCase()}
                    color={customer.status === "ACTIVE" ? "success" : "default"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Link
                    href={`customer/profile/${customer.id}`}
                    component={NextLink}
                    color="inherit"
                    variant="body2"
                    key={index}
                    style={{textDecoration: "none"}}
                    passHref
                  >
                    <Box>
                      <Fab size="small" color="primary" aria-label="edit">
                        <EditIcon />
                      </Fab>
                    </Box>
                  </Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <CustomPagination />
      </div>
    </div>
  );
}

export default CustomerOrderListTable;
