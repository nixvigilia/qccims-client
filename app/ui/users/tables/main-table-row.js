import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";
import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

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

const MainTableRow = ({data}) => {
  return (
    <>
      {data?.map((item, index) => (
        <StyledTableRow key={item.id || index}>
          <StyledTableCell component="th" scope="row">
            <Typography fontSize={"0.9rem"}>
              {item.firstName} {item.lastName}
            </Typography>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            <Typography fontSize={"0.9rem"}>{item.role}</Typography>
          </StyledTableCell>

          <TableCell>
            <Chip
              size="small"
              label={item.status.toLowerCase()}
              color={item.status === "APPROVED" ? "success" : "pending"}
            />
          </TableCell>
          <TableCell align="center">
            <Link
              href={`purchase/${item.id}`}
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
      ))}
    </>
  );
};

export default MainTableRow;
