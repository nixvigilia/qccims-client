"use client";
import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import PageBreadCrumbs from "@/app/ui/production/job-orders/page-bread-crumbs";
import MainView from "@/app/ui/quality/products/view/main-view";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    id ? `/api/delivery/job/orders/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.jobNumber} />
      <MainView initialData={data} />
    </>
  );
}
