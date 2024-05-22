"use client";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import ProductRow from "./ProductRow";

function CustomerListTable({data, mutate}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
      <table className="w-full text-xs text-left rtl:text-right text-gray-900 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Customer
            </th>

            <th scope="col" className="p-4">
              Address
            </th>
            <th scope="col" className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((customer, index) => (
            <ProductRow
              key={index}
              customerId={customer.id}
              companyName={customer.companyName}
              address={customer.address}
              mutate={mutate}
            />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default CustomerListTable;
