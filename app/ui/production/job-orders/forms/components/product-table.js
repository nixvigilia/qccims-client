import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";

export default function ProductTable() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <Grid item xs={6} key={i}>
          <Grid container>
            {[...Array(3)].map((_, index) => {
              return (
                <Grid
                  item
                  xs={4}
                  key={index}
                  sx={{
                    "& .MuiTableCell-root": {border: "1px solid black"},
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>OPTR#</TableCell>
                          <TableCell>QTY</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{height: "100px"}}>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </>
  );
}
