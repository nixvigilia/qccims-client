import SearchInput from "@/components/Dashboard/SearchInput";
import CustomerProfile from "@/components/Delivery/CustomerProfile";
import Link from "next/link";
import {Plus} from "lucide-react";

const Page = () => {
  return (
    <div className="p-4">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchInput placeholder="Search customers..." searchWidth="w-full" />
        <div className="pr-2 border-r border-gray-300">
          <Link
            href="customer-profile/new"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Add Customer</span>{" "}
            <Plus className="h-5 md:ml-4" />
          </Link>
        </div>
      </div>
      <CustomerProfile />
    </div>
  );
};

export default Page;
