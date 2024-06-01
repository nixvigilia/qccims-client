import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import SupplierForm from "@/components/Procurement/SupplierList/Forms/SupplierForm";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";

export default async function Page() {
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
            Create a new supplier
          </Typography>
        </Grid>
      </Grid>

      <SupplierForm />
    </>
  );
}
