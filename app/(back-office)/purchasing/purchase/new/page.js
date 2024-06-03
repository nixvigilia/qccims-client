"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";

import PurchaseOrderForm from "@/components/Procurement/PurchaseOrders/Forms/PurchaseOrderForm";

export default function Page() {
  return (
    <>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={5}
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold" component="div">
            Create a purchase order
          </Typography>
        </Grid>
      </Grid>

      <PurchaseOrderForm />
    </>
  );
}
