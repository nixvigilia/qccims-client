import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function SpecsTableLeft() {
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
                <TableCell width="200px" sx={{padding: "4px"}}>
                  BODY BLANK LENGTH
                </TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>BODY BLANK WIDTH</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>ACTUAL CAN HEIGHT</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>COVER / SPOUT</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>JOINT INTERLOCKING</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>HANDLE</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{padding: "4px"}}>HANDLE LOCATION</TableCell>
                <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
