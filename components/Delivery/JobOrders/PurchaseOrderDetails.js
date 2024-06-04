import {useEffect, useState} from "react";
import {useForm, useFieldArray, FormProvider} from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PurchaseOrderPdf from "./Pdf/JobOrdersPdf";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import NextLink from "next/link";
import Link from "@mui/material/Link";

export default function PurchaseOrderView({initialData = {}}) {
  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  // Preprocess initialData to format dates correctly
  const formattedInitialData = {
    ...initialData,
    orderDate: formatDate(initialData.orderDate),
    items:
      initialData.items?.map((item) => ({
        ...item,
        deliveryDate: formatDate(item.deliveryDate),
      })) || [],
  };

  const {control} = useForm({defaultValues: formattedInitialData});

  const {fields} = useFieldArray({
    control,
    name: "items",
  });

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    setSelectedSupplier({
      id: initialData.supplier.id,
      name: initialData.supplier.supplierName,
    });
  }, [initialData.supplier]);

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this purchase order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("use client");
        Swal.fire(
          "Approved!",
          "The purchase order has been approved.",
          "success"
        );
      }
    });
  };

  return (
    <FormProvider>
      <Box>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          mt={5}
          mb={2}
        >
          <Grid item>
            <Box mb={2}>
              <Chip
                size="small"
                label={initialData.status.toLowerCase()}
                color={
                  initialData.status === "APPROVED" ? "success" : "pending"
                }
              />
            </Box>
            <Typography variant="h4" fontWeight="bold" component="div">
              PO{initialData.id}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <Link
                href={`edit/${initialData.id}`}
                component={NextLink}
                color="inherit"
                variant="body2"
                style={{textDecoration: "none"}}
                passHref
              >
                <MenuItem>
                  <Typography ml={1}>Edit</Typography>
                </MenuItem>
              </Link>
              <PDFDownloadLink
                document={<PurchaseOrderPdf data={formattedInitialData} />}
                fileName={`PO${initialData.id}.pdf`}
                style={{textDecoration: "none", color: "inherit"}}
              >
                {({loading}) => (
                  <MenuItem disabled={loading}>
                    <DownloadIcon fontSize="small" />
                    <Typography ml={1}>
                      {loading ? "Loading document..." : " Download"}{" "}
                    </Typography>
                  </MenuItem>
                )}
              </PDFDownloadLink>
            </Menu>
          </Grid>
        </Grid>
        <Box component="div" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Order Date:</strong> {formattedInitialData.orderDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Term:</strong> {formattedInitialData.term}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Requestor:</strong> {formattedInitialData.requestor}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>VAT:</strong> {formattedInitialData.vat}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Supplier:</strong> {selectedSupplier?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Total Amount:</strong>{" "}
                {formattedInitialData.totalAmount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Remarks:</strong> {formattedInitialData.remarks}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={4} width="100%">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.description}</TableCell>
                      <TableCell>
                        {field.quantity} {field.unit}
                      </TableCell>
                      <TableCell>₱ {field.unitPrice}</TableCell>
                      <TableCell>₱ {field.amount}</TableCell>
                      <TableCell>{field.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider sx={{mt: 4, mb: 4}} />
          <Button variant="contained" color="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
