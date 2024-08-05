import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";

export default function SpecsTableRight({productSpecs}) {
  console.log(productSpecs);
  const {
    handleDistance,
    solder,
    beads,
    numberOfBeads,
    emboss,
    embossLocation,
    specRemarks,
  } = productSpecs;
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
                  {handleDistance}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  SOLDER
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  {solder}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  BEADS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  {beads}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  NUMBER OF BEADS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  {numberOfBeads}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  EMBOSS
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  {emboss}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  EMBOSS LOCATION
                </TableCell>
                <TableCell sx={{border: "1px solid black", padding: "4px"}}>
                  {embossLocation}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    border: "1px solid black",
                    padding: "4px",
                  }}
                >
                  REMARKS: {specRemarks}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
