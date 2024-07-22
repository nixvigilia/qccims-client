"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import PageBreadCrumbs from "@/app/ui/tinplate/cut-from-coil/page-bread-crumbs";
import MainForm from "@/app/ui/tinplate/cut-from-coil/forms/main-form";

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
            Coil Cut | Tinplate
          </Typography>
        </Grid>
      </Grid>

      <MainForm />
    </>
  );
}
