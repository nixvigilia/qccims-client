"use client";
import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";

import PurchaseOrderDetails from "@/components/Procurement/PurchaseOrders/PurchaseOrderDetails";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    id ? `/api/procurement/purchase/orders/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.supplierName} />

      <PurchaseOrderDetails initialData={data} />
    </>
  );
}
