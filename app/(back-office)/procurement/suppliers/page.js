import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import SupplierList from "@/components/Procurement/SupplierList";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";

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
            Supplier List
          </Typography>
        </Grid>
        <Grid item>
          <Link href="suppliers/new" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                height: 40,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgb(33, 150, 243)",
                },
              }}
            >
              <Box component="span" sx={{display: {xs: "none", md: "block"}}}>
                Add Supplier
              </Box>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SupplierList />
    </>
  );
};

export default Page;
