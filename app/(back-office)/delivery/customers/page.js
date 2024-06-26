import CustomerProfile from "@/components/Delivery/CustomerProfile";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import Link from "next/link";
import {Plus} from "lucide-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Page = () => {
  return (
    <Box>
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
            Customer List
          </Typography>
        </Grid>
        <Grid item>
          <Link href="customers/new" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Plus className="h-5" />}
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
                Add Customer
              </Box>
            </Button>
          </Link>
        </Grid>
      </Grid>

      <CustomerProfile />
    </Box>
  );
};

export default Page;
