import React from "react";
import RawMaterialsPagination from "./RawMaterialsPagination";
import {Pencil, Trash2} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

function Checkbox({id}) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={id} className="sr-only">
        checkbox
      </label>
    </div>
  );
}

function ProductRow({
  orderId,
  rackNumber,
  customer,
  description,
  status,
  tpiNo,
  qty,
  unit,
  thickness,
  width,
  length,
  netWeight,
}) {
  const pathname = usePathname();
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-6">
        <a
          href="#"
          className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
        >
          {rackNumber}
        </a>
      </th>
      <td className="px-2 py-3">{customer}</td>
      <td className="px-2 py-3">{description}</td>
      <td className="px-2 py-3">
        <span
          className={`${
            status === "PENDING"
              ? "bg-blue-400 text-white px-2 py-1 rounded-lg"
              : "bg-green-400 text-white px-2 py-1 rounded-lg"
          }`}
          style={{fontSize: "12px"}}
        >
          {status}
        </span>
      </td>
      <td className="px-2 py-3">{tpiNo}</td>
      <td className="px-2 py-3">{qty}</td>
      <td className="px-2 py-3">{unit}</td>
      <td className="px-2 py-3">{thickness}</td>
      <td className="px-2 py-3">{width}</td>
      <td className="px-2 py-3">{length}</td>
      <td className="px-2 py-3">{netWeight}</td>
      {pathname === "/raw-materials" && (
        <td className="py-3 pr-3">
          <div className="flex justify-end gap-3">
            <Link
              href={`/raw-materials/${orderId}`}
              className="rounded-md border p-1 hover:bg-gray-100"
            >
              <Pencil className="w-4" />
            </Link>
            <Link href={``} className="rounded-md border p-1 hover:bg-gray-100">
              <Trash2 className="w-4" />
            </Link>
          </div>
        </td>
      )}
    </tr>
  );
}

function RawMaterialsTable({data}) {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
      <table className="w-full text-xs text-left rtl:text-right text-gray-900 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-6">
              Rack #
            </th>
            <th scope="col" className="px-2 py-3">
              Customer
            </th>
            <th scope="col" className="px-2 py-3">
              Description
            </th>
            <th scope="col" className="px-2 py-3">
              status
            </th>
            <th scope="col" className="px-2 py-3">
              TPI No.
            </th>
            <th scope="col" className="px-2 py-3">
              Qty
            </th>
            <th scope="col" className="px-2 py-3">
              Unit
            </th>
            <th scope="col" className="px-2 py-3">
              Thkns.
            </th>
            <th scope="col" className="px-2 py-3">
              Width
            </th>
            <th scope="col" className="px-2 py-3">
              Length
            </th>
            <th scope="col" className="px-2 py-3">
              NetWt (kg)
            </th>

            {pathname === "/raw-materials" && (
              <th scope="col" className="px-2 py-3"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {console.log(data)}
          {data?.map((order, index) => (
            <ProductRow
              key={index}
              orderId={order.id}
              id={`checkbox-table-search-${index + 1}`}
              rackNumber={order.rackNumber}
              customer={order.customer.companyName}
              description={order.item.name}
              status={order.status}
              tpiNo={order.tpiNo}
              qty={order.quantity}
              unit={order.unit.abbrevation}
              thickness={order.thickness}
              width={order.width}
              length={order.length}
              netWeight={order.netWeight}
            />
          ))}
        </tbody>
      </table>
      <RawMaterialsPagination />
    </div>
  );
}

export default RawMaterialsTable;
