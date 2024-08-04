import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";

export default function ProductInfo({product, data}) {
  const {productName} = product;
  const {salesOrder, quantity, unit, remarks, deliveryDate} = data;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PRODUCT DESCRIPTION</TableCell>
            <TableCell>SO/PO</TableCell>
            <TableCell>DELIVERY DATE</TableCell>
            <TableCell>QUANTITY</TableCell>
            <TableCell>UNIT</TableCell>
            <TableCell>REMARKS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{productName}</TableCell>
            <TableCell>{salesOrder}</TableCell>
            <TableCell>
              {deliveryDate ? formatISODateToReadable(deliveryDate) : ""}
            </TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{unit.abbreviation}</TableCell>
            <TableCell>{remarks}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
