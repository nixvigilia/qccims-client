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
      {data?.map((item, index) => {
        console.log(item);
        const {jobOrderItem} = item;
        const {jobOrder, product} = jobOrderItem;
        return (
          <StyledTableRow key={item.id || index}>
            <StyledTableCell component="th" scope="row">
              <Typography fontSize={"0.9rem"}>{jobOrder.jobNumber}</Typography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              <Typography fontSize={"0.9rem"}>{jobOrder.jobNumber}</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography fontSize={"0.9rem"}>{jobOrder.jobNumber}</Typography>
            </StyledTableCell>

            <TableCell align="center">
              <Link
                href={`job-orders/${item.id}`}
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
            </TableCell>
          </StyledTableRow>
        );
      })}
    </>
  );
};

export default MainTableRow;
