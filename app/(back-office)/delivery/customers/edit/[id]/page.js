"use client";

import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import CustomerProfileForm from "@/components/Delivery/CustomerProfile/Forms/CustomerProfileForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import CustomerDetails from "@/components/Delivery/CustomerProfile/CustomerDetails";
import ProfileNav from "@/components/Delivery/CustomerProfile/ProfileNav";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(id ? `/api/customer/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box p={4} mt={4}>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        mb={4}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="bold" component="div">
            Update Company Profile
          </Typography>
        </Grid>
      </Grid>

      <ProfileNav customerId={data?.id} />

      <CustomerProfileForm initialData={data} isUpdate />
    </Box>
  );
}
