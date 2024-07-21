"use client";
import useSWR from "swr";
import { getData } from "@/lib/actions/data/getData";
import PageBreadCrumbs from "@/app/ui/tinplate/skid/page-bread-crumbs";
import ItemForm from "@/app/ui/tinplate/skid/forms/item-form";

export default function Page({ params }) {
  const { id } = params;
  const fetcher = (url) => getData(url);
  const { data, error, mutate } = useSWR(
    id ? `/api/production/job/items/${parseInt(id)}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs lastPathName={data?.product.productName} />
      <ItemForm
        initialData={data}
        itemId={parseInt(id)}
        isUpdate
        mutate={mutate}
      />
    </>
  );
}
