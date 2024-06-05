"use client";

import CustomPagination from "@/components/CustomPagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
  fontSize: "14px",
}));

function PurchaseItemsTable({
  tableHeaders,
  data,
  totalCount,
  itemsPerPage,
  page,
  onPageChange,
}) {
  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{borderRadius: "sm", overflow: "auto", width: "100%", minHeight: 0}}
      >
        <Table sx={{minWidth: 650}} size="small" aria-label="customer table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <StyledTableCell key={index} align={header.align || "left"}>
                  {header.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={item.id || index}>
                <StyledTableCell component="th" scope="row">
                  <Typography fontSize={"0.9rem"}>
                    PO{item.purchase.id}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Typography fontSize={"0.9rem"}>
                    {item.description}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography fontSize={"0.9rem"}>
                    {formatISODateToReadable(item.purchase.orderDate)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography fontSize={"0.9rem"}>
                    {item.deliveryDate
                      ? formatISODateToReadable(item.deliveryDate)
                      : null}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Typography fontSize={"0.9rem"}>
                    {item.quantity} {item.unit}
                  </Typography>
                </StyledTableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={item.status.toLowerCase()}
                    color={item.status === "RECEIVED" ? "success" : "pending"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="in progress">
                    <Link
                      // href={`items/${item.id}`}
                      href=""
                      component={NextLink}
                      color="inherit"
                      variant="body2"
                      key={index}
                      style={{textDecoration: "none"}}
                      passHref
                    >
                      <Box>
                        <Fab size="small" color="primary" aria-label="edit">
                          <Edit />
                        </Fab>
                      </Box>
                    </Link>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop: "20px"}}>
        <CustomPagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default PurchaseItemsTable;
