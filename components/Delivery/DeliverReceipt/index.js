"use client";
import React from "react";
import DeliverReceiptTable from "./Tables/DeliverReceiptTable";
import useSWR from "swr";
import {fetchWithToken} from "@/lib/actions/data/getData";

const DeliverReceipt = () => {
  const {data, error, mutate} = useSWR("/api/delivery/list", fetchWithToken);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="mt-4">
      <DeliverReceiptTable data={data} mutate={mutate} />
    </div>
  );
};

export default DeliverReceipt;
