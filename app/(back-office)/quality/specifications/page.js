import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/app/ui/quality/specifications/page-bread-crumbs";
import SpecificationList from "@/app/ui/quality/specifications/specification-list";

const Page = () => {
  return (
    <>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={4}
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold" component="div">
            Tin Can Specifications
          </Typography>
        </Grid>
      </Grid>
      <SpecificationList />
    </>
  );
};

export default Page;
