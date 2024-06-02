"use client";

import useSWR from "swr";
import {getData} from "@/lib/actions/data/getData";
import DeliveryForm from "@/components/Delivery/DeliverReceipt/Forms/DeliveryForm";

export default function Page({params}) {
  const {id} = params;
  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(id ? `/api/delivery/${id}` : null, fetcher);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="m-6">
      <div className="w-full bg-white border border-gray-200 rounded-md shadow md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <h1 className="pb-2 text-2xl font-bold text-gray-800">
          Update Customer Profile
        </h1>
        <DeliveryForm initialData={data} isUpdate />
      </div>
    </div>
  );
}
