"use client";
import FilterForm from "./Forms/FilterForm";
import SupplierListTable from "./Tables/SupplierListTable";
import {fetchWithToken} from "@/lib/actions/data/getData";
import useSWR from "swr";

const SupplierList = () => {
  const {data, error, mutate} = useSWR(
    "/api/procurement/suppliers/list",
    fetchWithToken
  );

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="mt-4">
      <FilterForm />
      <SupplierListTable data={data} mutate={mutate} />
    </div>
  );
};

export default SupplierList;
