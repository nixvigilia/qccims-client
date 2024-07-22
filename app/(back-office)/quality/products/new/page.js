"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/app/ui/quality/products/page-bread-crumbs";
import MainForm from "@/app/ui/quality/products/forms/main-form";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";

export default function Page() {
  const fetcher = (url) => getData(url);
  const {data, error, mutate} = useSWR(`/api/quality/products/list`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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

      <MainForm data={data} mutate={mutate} />
    </>
  );
}
