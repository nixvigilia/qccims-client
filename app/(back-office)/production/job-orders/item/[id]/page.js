"use client";
import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import ItemForm from "@/app/ui/production/job-orders/forms/item-form";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    id ? `/api/production/job/items/${id}` : null,
    fetcher
  );

  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.jobNumber} />
      <ItemForm initialData={data} isUpdate />
    </>
  );
}
