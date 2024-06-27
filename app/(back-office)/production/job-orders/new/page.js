"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import PageBreadCrumbs from "@/app/ui/production/job-orders/page-bread-crumbs";
import MainForm from "@/app/ui/production/job-orders/forms/main-form";

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
            Create Job Order | Production
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/production/job-orders/existing" passHref>
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
                Existing
              </Box>
            </Button>
          </Link>
        </Grid>
      </Grid>

      <MainForm />
    </>
  );
}
