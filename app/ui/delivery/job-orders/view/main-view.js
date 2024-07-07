import {useEffect, useState} from "react";
import {useForm, useFieldArray, FormProvider} from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
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
import DownloadIcon from "@mui/icons-material/Download";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PurchaseOrderPdf from "../pdf/PurchaseOrderPdf";
import Swal from "sweetalert2";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

export default function MainView({initialData = {}}) {
  const formattedInitialData = {
    ...initialData,
    jobOrderItems:
      initialData.jobOrderItems?.map((item) => ({
        ...item,
        jobOrderItemId: item.id,
      })) || [],
  };

  const {control} = useForm({defaultValues: formattedInitialData});

  const {fields} = useFieldArray({
    control,
    name: "jobOrderItems",
  });

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
              {initialData.jobNumber}
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
                  width: "15ch",
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
                document={<PurchaseOrderPdf data={initialData} />}
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
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                <strong>Customer Name:</strong>{" "}
                {initialData.customer.companyName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1">
                <strong>Date:</strong>{" "}
                {formatISODateToReadable(initialData.jobDate)}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={4} width="100%">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="30%">
                      <Typography variant="overline">
                        Product Description
                      </Typography>
                    </TableCell>
                    <TableCell width="10%">
                      <Typography variant="overline">SO/PO</Typography>
                    </TableCell>
                    <TableCell width="15%">
                      <Typography variant="overline">Delivery Date</Typography>
                    </TableCell>
                    <TableCell width="10%">
                      <Typography variant="overline">Quantity</Typography>
                    </TableCell>
                    <TableCell width="5%">
                      <Typography variant="overline">Unit</Typography>
                    </TableCell>
                    <TableCell width="10%">
                      <Typography variant="overline">Remarks</Typography>
                    </TableCell>
                    <TableCell width="5%"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell width="30%">
                        {field.product.productName}
                      </TableCell>
                      <TableCell>{field.salesOrder}</TableCell>
                      <TableCell>
                        {field.deliveryDate
                          ? formatISODateToReadable(field.deliveryDate)
                          : ""}
                      </TableCell>
                      <TableCell>{field.quantity}</TableCell>
                      <TableCell>{field.unit.abbreviation}</TableCell>
                      <TableCell>{field.remarks}</TableCell>
                      <TableCell>
                        <Link
                          href={`item/${field.jobOrderItemId}`}
                          component={NextLink}
                          color="inherit"
                          variant="body2"
                          style={{textDecoration: "none"}}
                          passHref
                        >
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                          >
                            <EditTwoToneIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider sx={{mt: 4, mb: 4}} />
          {/* <Button variant="contained" color="primary" onClick={handleApprove}>
            Approve (Note:function in progress)
          </Button> */}
        </Box>
      </Box>
    </FormProvider>
  );
}
