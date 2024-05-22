"use client";
import React from "react";
import CustomerListTable from "./Tables/CustomerListTable";
import useSWR from "swr";
import {fetchWithToken} from "@/lib/actions/data/getData";

const CustomerProfile = () => {
  const {data, error, mutate} = useSWR("/api/customer/list", fetchWithToken);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="mt-4">
      <CustomerListTable data={data} mutate={mutate} />
    </div>
  );
};

export default CustomerProfile;
