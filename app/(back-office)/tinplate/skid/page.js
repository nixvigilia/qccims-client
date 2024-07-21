import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import PageBreadCrumbs from "@/app/ui/tinplate/skid/page-bread-crumbs";
import SkidList from "@/app/ui/tinplate/skid/skid-list";

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
            Skid List | Tinplate
          </Typography>
        </Grid>
        <Grid item>
          <Link href="skid/new" passHref>
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
              <Box
                component="span"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Create Skid List
              </Box>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SkidList />
    </>
  );
};

export default Page;
