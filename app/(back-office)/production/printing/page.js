import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import PageBreadCrumbs from "@/app/ui/production/job-orders/page-bread-crumbs";
import JobOrderList from "@/app/ui/production/job-orders/job-order-list";

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
            Job Orders | Printing
          </Typography>
        </Grid>
      </Grid>
      <JobOrderList />
    </>
  );
};

export default Page;
