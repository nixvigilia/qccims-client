import React from "react";
import ChartLayout from "@/components/dashboard/ChartLayout";
import RawMaterialsLayout from "@/components/raw-materials/RawMaterialsLayout";

export default async function Page() {
  return (
    <div>
      <ChartLayout />
      <RawMaterialsLayout />
    </div>
  );
}
