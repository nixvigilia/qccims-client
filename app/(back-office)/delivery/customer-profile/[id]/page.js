"use client";

import useSWR from "swr";
import {getCustomerInfoById} from "@/lib/actions/data/getData";
import CustomerProfileForm from "@/components/Delivery/CustomerProfile/Forms/CustomerProfileForm";

export default function EditCustomerPage({params}) {
  const {id} = params;
  const fetcher = (url) => getCustomerInfoById(url);
  const {data, error} = useSWR(id ? `/api/customer/${id}` : null, fetcher);

  console.log(data);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="m-6">
      <div className="w-full bg-white border border-gray-200 rounded-md shadow md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <h1 className="pb-2 text-2xl font-bold text-gray-800">
          Update Customer Profile
        </h1>
        <CustomerProfileForm initialData={data} isUpdate />
      </div>
    </div>
  );
}
