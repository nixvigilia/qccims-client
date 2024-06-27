"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/app/ui/delivery/job-orders/page-bread-crumbs";
import MainForm from "@/app/ui/delivery/job-orders/forms/main-form";

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
            Create Job Order
          </Typography>
        </Grid>
      </Grid>

      <MainForm />
    </>
  );
}
