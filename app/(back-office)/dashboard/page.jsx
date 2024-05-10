import React from "react";
import dynamic from "next/dynamic";
import ChartLayout from "@/components/dashboard/ChartLayout";
import RawMaterialsLayout from "@/components/raw-materials/RawMaterialsLayout";
const LineChart = dynamic(
  () => import("@/components/raw-materials/charts/LineChart"),
  {
    ssr: false, // This will only render the component client-side
  }
);

import MonthlyRevenueChart from "@/components/raw-materials/charts/MonthlyRevenueChart";

export default async function Page() {
  return (
    <div>
      <ChartLayout />
      <div className="flex w-full px-5 mx-auto mt-8">
        <div className=" w-full">
          <LineChart />
        </div>
        <div className=" w-full">
          <MonthlyRevenueChart />
        </div>
      </div>

      <RawMaterialsLayout />
    </div>
  );
}
