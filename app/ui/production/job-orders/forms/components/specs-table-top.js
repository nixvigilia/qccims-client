import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function SpecsTableTop({productSpecs}) {
  const {
    body1,
    body2,
    body3,
    body4,
    bottom1,
    bottom2,
    bottom3,
    bottom4,
    cover1,
    cover2,
    cover3,
    cover4,
    topRing1,
    topRing2,
    topRing3,
    topRing4,
  } = productSpecs;

  return (
    <TableContainer sx={{padding: 0, margin: 0}}>
      <Table size="small" sx={{padding: 0, margin: 0}}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid black",
                padding: "4px",
                width: "8%",
              }}
            ></TableCell>
            <TableCell
              colSpan={3}
              sx={{
                border: "1px solid black",
                textAlign: "center",
                padding: "4px",
                width: "72%",
              }}
            >
              STANDARD MATERIALS
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid black",
                padding: "4px",
                width: "20%",
              }}
            >
              BASE WT.
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "8%"}}
            >
              BODY
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {body1}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {body2}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {body3}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "20%"}}
            >
              {body4}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "8%"}}
            >
              BOTTOM
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {bottom1}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {bottom2}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {bottom3}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "20%"}}
            >
              {bottom4}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "8%"}}
            >
              COVER
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {cover1}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {cover2}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {cover3}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "20%"}}
            >
              {cover4}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "8%"}}
            >
              TOPRING
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {topRing1}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {topRing2}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "24%"}}
            >
              {topRing3}
            </TableCell>
            <TableCell
              sx={{border: "1px solid black", padding: "4px", width: "20%"}}
            >
              {topRing4}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
