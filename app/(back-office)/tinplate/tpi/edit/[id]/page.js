"use client";
import useSWR from "swr";
import { getData } from "@/lib/actions/data/getData";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MainForm from "@/app/ui/tinplate/tpi/forms/main-form";
import PageBreadCrumbs from "@/app/ui/tinplate/tpi/page-bread-crumbs";

export default function Page({ params }) {
  const { id } = params;
  const fetcher = (url) => getData(url);
  const { data, error } = useSWR(
    id ? `/api/delivery/job/orders/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.supplierName} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={5}
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold" component="div">
            {/* {data?.jobNumber} */}
          </Typography>
        </Grid>
      </Grid>

      <MainForm initialData={data} isUpdate />
    </>
  );
}
