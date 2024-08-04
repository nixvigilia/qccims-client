import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";

export default function SpecsTableRight() {
  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sx={{
          "& .MuiTableCell-root": {
            border: "1px solid black",
            padding: "4px",
          },
        }}
      >
        <TableContainer component={Paper} sx={{padding: 0, margin: 0}}>
          <Table size="small" sx={{padding: 0, margin: 0}}>
            <TableBody>
              <TableRow>
                <TableCell
                  width="200px"
                  sx={{border: "1px solid black", padding: "4px"}}
                >
                  HANDLE DISTANCE
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SOLDER
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  BEADS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  NUMBER OF BEADS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  EMBOSS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  EMBOSS LOCATION
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SAMPLE DATA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    border: "1px solid black",
                    padding: "4px",
                    fontSize: "10px",
                  }}
                >
                  REMARKS: Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
