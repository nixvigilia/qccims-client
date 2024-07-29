import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/app/ui/quality/products/page-bread-crumbs";
import MainForm from "@/app/ui/quality/products/forms/main-form";

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
            Product Entry
          </Typography>
        </Grid>
      </Grid>
      <MainForm />
    </>
  );
}
