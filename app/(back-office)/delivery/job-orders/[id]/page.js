"use client";
import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import JobOrderDetails from "@/components/Delivery/JobOrders/JobOrderDetails";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    id ? `/api/delivery/job/orders/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.jobNumber} />

      <JobOrderDetails initialData={data} />
    </>
  );
}
