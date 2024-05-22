import React from "react";

import CreateItemForm from "@/components/Dashboard/CreateItemForm";

export default async function Page(params) {
  console.log(params);
  return (
    <div className="m-6">
      <div className="w-full bg-white border border-gray-200 rounded-md shadow md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <h1 className="pb-2 text-2xl font-bold text-gray-800">
          Create Raw Materials Order for Customers
        </h1>
        <CreateItemForm />
      </div>
    </div>
  );
}
