import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoCompleteForm from "../auto-complete-form";

export default function ProductSpecsDetails({
  selectedCustomer,
  setSelectedCustomer,
  selectedProducts,
  setSelectedProducts,
}) {
  return (
    <Grid item xs={12}>
      <TableContainer sx={{padding: 0, margin: 0}}>
        <Table size="small" sx={{padding: 0, margin: 0}}>
          <TableBody>
            <TableRow>
              {/* <TableCell sx={{width: "25%", padding: "4px"}}>
                <Typography variant="button">ID #:</Typography>
              </TableCell> */}
              <TableCell sx={{padding: "4px"}}>
                <Typography variant="button">
                  <AutoCompleteForm
                    selectedDetails={selectedCustomer}
                    setSelectedDetails={setSelectedCustomer}
                    columnName="products"
                    title="Product Name"
                    endpoint="/api/production/product-specs/list"
                  />
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{padding: "4px"}}>
                <Typography variant="button">CAN SIZE:</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
