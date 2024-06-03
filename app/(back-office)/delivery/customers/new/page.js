import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomerProfileForm from "@/components/Delivery/CustomerProfile/Forms/CustomerProfileForm";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";

export default async function Page() {
  return (
    <Box p={4} mt={4}>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        mb={4}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="bold" component="div">
            Create New Customer
          </Typography>
        </Grid>
      </Grid>

      <CustomerProfileForm />
    </Box>
  );
}
