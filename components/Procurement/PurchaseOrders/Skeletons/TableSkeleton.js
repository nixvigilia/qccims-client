import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
  fontSize: "14px",
}));

const TableRowsLoader = ({rowsNum}) => {
  return (
    <>
      {[...Array(rowsNum)].map((_, index) => (
        <StyledTableRow key={index}>
          <StyledTableCell>
            <Skeleton animation="wave" variant="text" />
          </StyledTableCell>
          <StyledTableCell>
            <Skeleton animation="wave" variant="text" />
          </StyledTableCell>
          <StyledTableCell>
            <Skeleton animation="wave" variant="text" />
          </StyledTableCell>
          <StyledTableCell>
            <Skeleton animation="wave" variant="text" />
          </StyledTableCell>
          <StyledTableCell>
            <Skeleton animation="wave" variant="text" />
          </StyledTableCell>
          <StyledTableCell align="center">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </>
  );
};

const TableSkeleton = ({rowsNum, tableHeaders}) => {
  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{borderRadius: "sm", overflow: "auto", width: "100%", minHeight: 0}}
      >
        <Table
          sx={{minWidth: 650}}
          size="small"
          aria-label="purchase orders table"
        >
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
            <TableRowsLoader rowsNum={rowsNum} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableSkeleton;
