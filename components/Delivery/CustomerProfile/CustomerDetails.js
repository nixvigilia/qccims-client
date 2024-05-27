import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CustomerDetails = ({data}) => {
  if (!data) {
    return (
      <Container>
        <Typography variant="h6" color="textSecondary">
          No customer data available
        </Typography>
      </Container>
    );
  }

  return (
    <Grid container spacing={3} mt={1}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Company Name:
          </Typography>
          <Typography>{data.companyName}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Address:
          </Typography>
          <Typography>{data.address || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Contact:
          </Typography>
          <Typography>{data.contact || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            TIN Number:
          </Typography>
          <Typography>{data.tinNumber || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Delivery Recipient:
          </Typography>
          <Typography>{data.deliveryRecipient || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Delivery Address:
          </Typography>
          <Typography>{data.deliveryAddress || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Notes:
          </Typography>
          <Typography>{data.notes || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 2}} />
        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        {data.contactInfos && data.contactInfos.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="contact information table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Contact Person</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Contact Position</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Contact Tel</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.contactInfos.map((contactInfo) => (
                  <TableRow key={contactInfo.id}>
                    <TableCell>{contactInfo.contactPerson || "N/A"}</TableCell>
                    <TableCell>
                      {contactInfo.contactPosition || "N/A"}
                    </TableCell>
                    <TableCell>{contactInfo.contactTel || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No contact information available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomerDetails;
