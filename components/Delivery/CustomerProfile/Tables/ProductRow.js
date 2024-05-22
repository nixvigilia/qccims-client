"use client";
import DeleteBtn from "@/components/Dashboard/DeleteBtn";
import {Pencil, Trash2} from "lucide-react";
import Link from "next/link";

function ProductRow({customerId, companyName, address, mutate}) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">{companyName}</td>
      <td className="p-4">{address}</td>
      <td className="p-4">
        <div className="flex justify-end gap-3">
          <Link
            href={`customer-profile/${customerId}`}
            className=" p-1 hover:bg-gray-100"
          >
            <Pencil className="w-4" />
          </Link>
          <DeleteBtn id={customerId} endpoint="customer" mutate={mutate} />
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
