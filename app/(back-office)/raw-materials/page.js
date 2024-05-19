import React from "react";
import RawMaterialsLayout from "@/components/RawMaterials/RawMaterialsLayout";
import {Plus} from "lucide-react";
import SearchInput from "@/components/dashboard/SearchInput";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full p-4">
      <div className="mt-4 flex items-center justify-between gap-2 mb-4">
        <SearchInput />

        <div className="border-gray-300">
          <Link
            href="/raw-materials/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create Raw Materials</span>{" "}
            <Plus className="h-5 md:ml-4" />
          </Link>
        </div>
      </div>
      <RawMaterialsLayout />
    </div>
  );
};

export default Page;
