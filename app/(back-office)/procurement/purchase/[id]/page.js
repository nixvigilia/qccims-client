"use client";

import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import ProfileNav from "@/components/Delivery/CustomerProfile/ProfileNav";
import PurchaseOrderForm from "@/components/Procurement/PurchaseOrders/Forms/PurchaseOrderForm";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    id ? `/api/procurement/purchase/${id}` : null,
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
            Supplier Profile
          </Typography>
        </Grid>
      </Grid>

      {/* <ProfileNav customerId={data?.id} /> */}
      <PurchaseOrderForm initialData={data} isUpdate />
    </>
  );
}
