import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function MaterialTable() {
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} sx={{padding: 0, margin: 0}}>
        <Table size="small" sx={{padding: 0, margin: 0}}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{border: "1px solid black", padding: "4px", width: "8%"}}
              ></TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "4px",
                }}
              >
                STANDARD MATERIALS
              </TableCell>
              <TableCell
                sx={{border: "1px solid black", padding: "4px", width: "12%"}}
              >
                BASE WT.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                BODY
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                100# +/- 5%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                BOTTOM
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                100# +/- 5%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                COVER
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                100# +/- 5%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                TOPRING
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                SAMPLE DATA
              </TableCell>
              <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                100# +/- 5%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
