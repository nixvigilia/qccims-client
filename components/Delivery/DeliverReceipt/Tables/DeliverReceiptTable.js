"use client";

import CustomPagination from "@/components/CustomPagination";
import ProductRow from "./ProductRow";

function DeliverReceiptTable({data, mutate}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
      <table className="w-full text-xs text-left rtl:text-right text-gray-900 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Recipient
            </th>
            <th scope="col" className="p-4">
              Delivery Date
            </th>
            <th scope="col" className="p-4">
              Purchase Order
            </th>
            <th scope="col" className="p-4">
              Shipping Method
            </th>
            <th scope="col" className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((delivery, index) => (
            <ProductRow
              key={index}
              deliveryId={delivery.id}
              recipient={delivery.recipient}
              deliveryDate={delivery.deliveryDate}
              purchaseOrder={delivery.purchaseOrder}
              shippingMethod={delivery.shippingMethod}
              mutate={mutate}
            />
          ))}
        </tbody>
      </table>
      <CustomPagination />
    </div>
  );
}

export default DeliverReceiptTable;
