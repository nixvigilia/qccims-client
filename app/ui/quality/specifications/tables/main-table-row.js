import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";
import {styled} from "@mui/material/styles";

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

const MainTableRow = ({data}) => {
  return (
    <>
      {data?.map((order, index) => (
        <StyledTableRow key={order.id || index}>
          <StyledTableCell component="th" scope="row">
            <Typography fontSize={"0.9rem"}>{order.jobNumber}</Typography>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            <Typography fontSize={"0.9rem"}>
              {order.customer.companyName}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography fontSize={"0.9rem"}>
              {formatISODateToReadable(order.jobDate)}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Typography fontSize={"0.9rem"}>
              {order?.jobOrderItems[0]?.deliveryDate
                ? formatISODateToReadable(order?.jobOrderItems[0]?.deliveryDate)
                : ""}
            </Typography>
          </StyledTableCell>
          <TableCell>
            <Chip
              size="small"
              label={order.status.toLowerCase()}
              color={order.status === "APPROVED" ? "success" : "pending"}
            />
          </TableCell>
          <TableCell align="center">
            <Link
              href={`specifications/${order.id}`}
              component={NextLink}
              color="inherit"
              variant="body2"
              key={index}
              style={{textDecoration: "none"}}
              passHref
            >
              <Fab size="small" color="primary" aria-label="edit">
                <Edit />
              </Fab>
            </Link>
          </TableCell>
        </StyledTableRow>
      ))}
    </>
  );
};

export default MainTableRow;
