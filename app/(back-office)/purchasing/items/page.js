import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import PurchaseItems from "@/components/Procurement/Items";

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
            Purchase Items
          </Typography>
        </Grid>
      </Grid>
      <PurchaseItems />
    </>
  );
};

export default Page;
