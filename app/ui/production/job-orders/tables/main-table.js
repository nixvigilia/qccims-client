"use client";

import CustomPagination from "@/components/CustomPagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import MainTableRow from "./main-table-row";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  fontSize: "14px",
}));

function MainTable({
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
            <MainTableRow data={data} />
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop: "20px"}}>
        {/* <CustomPagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          page={page}
          onPageChange={onPageChange}
        /> */}
      </div>
    </div>
  );
}

export default MainTable;
