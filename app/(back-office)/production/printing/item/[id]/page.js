"use client";
import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import PageBreadCrumbs from "@/app/ui/production/job-orders/page-bread-crumbs";
import PrintLayout from "@/app/ui/production/job-orders/forms/print-layout";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error, mutate} = useSWR(
    id ? `/api/production/job/items/${parseInt(id)}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.product?.productName} />
      <PrintLayout
        initialData={data}
        itemId={parseInt(id)}
        isUpdate
        mutate={mutate}
      />
    </>
  );
}
