"use client";
import React from "react";
import RawMaterialsTable from "@/components/raw-materials/tables/RawMaterialsTable";
import useSWR from "swr";
import {fetchWithToken} from "@/lib/actions/data/getData";

const RawMaterialsLayout = () => {
  const {data: customerOrders, error} = useSWR(
    "/api/customer/orders",
    fetchWithToken
  );

  if (error) return <div className="p-6">Failed to load</div>;
  if (!customerOrders) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <RawMaterialsTable data={customerOrders} />
    </div>
  );
};

export default RawMaterialsLayout;
