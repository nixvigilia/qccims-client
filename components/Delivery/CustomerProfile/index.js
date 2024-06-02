"use client";
import CustomerListTable from "./Tables/CustomerListTable";
import useSWR from "swr";
import {fetchWithToken} from "@/lib/actions/data/getData";
import FilterForm from "./Forms/FilterForm";

const CustomerProfile = () => {
  const {data, error, mutate} = useSWR("/api/customer/list", fetchWithToken);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  console.log(data);

  return (
    <div className="mt-4">
      <FilterForm />
      <CustomerListTable data={data} mutate={mutate} />
    </div>
  );
};

export default CustomerProfile;
