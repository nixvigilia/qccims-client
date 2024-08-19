"use client";
import useSWR from "swr";
import { fetchWithToken } from "@/lib/actions/data/getData"; // Adjust the path if needed
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MainForm from "@/app/ui/tinplate/coil/forms/main-form";
import PageBreadCrumbs from "@/app/ui/tinplate/coil/page-bread-crumbs";

export default function Page({ params }) {
  const { id } = params;

  // Define the fetcher function
  const fetcher = (url) => fetchWithToken(url);

  // Fetch data from the API using SWR
  const { data, error } = useSWR(
    id ? `/api/tinplate/whole/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.contract} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={5}
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold" component="div">
            {/* Display the Coil Number or another identifier here */}
            {data?.number} {/* or another field if you prefer */}
          </Typography>
        </Grid>
      </Grid>

      <MainForm initialData={data} isUpdate />
    </>
  );
}
