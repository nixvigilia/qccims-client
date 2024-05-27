"use client";
import DeleteBtn from "@/components/Dashboard/DeleteBtn";
import {Pencil, Trash2} from "lucide-react";
import Link from "next/link";
import {format} from "date-fns";

function ProductRow({
  deliveryId,
  recipient,
  deliveryDate,
  purchaseOrder,
  shippingMethod,
  mutate,
}) {
  const formattedDate = format(new Date(deliveryDate), "EEEE, MMMM do, yyyy");
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">{recipient}</td>
      <td className="p-4">{formattedDate}</td>
      <td className="p-4">{purchaseOrder}</td>
      <td className="p-4">{shippingMethod}</td>
      <td className="p-4">
        <div className="flex justify-end gap-3">
          <Link
            href={`receipt/${deliveryId}`}
            className=" p-1 hover:bg-gray-100"
          >
            <Pencil className="w-4" />
          </Link>
          <DeleteBtn id={deliveryId} endpoint="customer" mutate={mutate} />
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
