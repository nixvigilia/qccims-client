import React from "react";

import CreateItemForm from "@/components/dashboard/CreateItemForm";

export default async function Page(params) {
  console.log(params);
  return (
    <div>
      <CreateItemForm />
    </div>
  );
}
