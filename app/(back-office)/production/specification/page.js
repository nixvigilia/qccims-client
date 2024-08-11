import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/app/ui/quality/specifications/page-bread-crumbs";
import SpecificationList from "@/app/ui/quality/specifications/specification-list";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

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
            Product Specification List
          </Typography>
        </Grid>
        <Grid item>
          <Link href="specification/new" passHref>
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
                Create Product Specs
              </Box>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SpecificationList />
    </>
  );
};

export default Page;
