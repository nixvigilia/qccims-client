"use client";

import DeleteBtn from "@/components/Dashboard/DeleteBtn";
import {Pencil, Trash2} from "lucide-react";
import Link from "next/link";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {IconButton} from "@mui/material";

function ProductRow({customerId, companyName, address, mutate}) {
  return (
    <TableRow
      sx={{
        bgcolor: "background.paper",
        "&:hover": {
          bgcolor: "action.hover",
        },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <TableCell>{companyName}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px"}}>
          <Link href={`customers/${customerId}`} passHref>
            <IconButton component="a" size="small">
              <Pencil className="w-4" />
            </IconButton>
          </Link>
          <DeleteBtn id={customerId} endpoint="customer" mutate={mutate} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
