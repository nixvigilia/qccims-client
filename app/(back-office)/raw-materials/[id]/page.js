import React from "react";

import CreateItemForm from "@/components/dashboard/CreateItemForm";

export default async function Page(params) {
  console.log(params);
  return (
    <div className="m-6">
      <h1 className="p-4 text-2xl font-bold text-gray-800">
        Create Raw Materials Order for Customers
      </h1>
      <CreateItemForm />
    </div>
  );
}
