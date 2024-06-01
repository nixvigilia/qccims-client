"use client";
import React, {useState, useCallback} from "react";
import FilterForm from "@/components/Delivery/CustomerProfile/Forms/FilterForm";
import PurchaseOrdersTable from "./Tables/PurchaseOrdersTable";
import {fetchWithToken} from "@/lib/actions/data/getData";
import useSWR from "swr";
import HorizontalNav from "./Nav/HorizontalNav";
import {useSearchParams} from "next/navigation";
import {useDebounce} from "use-debounce";
import TableSkeleton from "./Skeletons/TableSkeleton";

const ITEMS_PER_PAGE = 20;

const PurchaseOrders = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  const {data, error, mutate} = useSWR(
    `/api/procurement/purchase/list?status=${status}&search=${debouncedSearch}&page=${page}&limit=${ITEMS_PER_PAGE}`,
    fetchWithToken
  );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const tableHeaders = [
    {label: "Product Description"},
    {label: "Order Date"},
    {label: "Delivery Date"},
    {label: "Quantity"},
    {label: "Status"},
    {label: "Action", align: "center"},
  ];

  return (
    <>
      <HorizontalNav
        totalCount={data?.totalCount || 0}
        pendingCount={data?.pendingCount || 0}
        receivedCount={data?.receivedCount || 0}
      />
      <FilterForm onSearchChange={handleSearchChange} />
      {error && <div className="p-6">Failed to load</div>}
      {!data && !error && (
        <div className="p-6">
          <TableSkeleton rowsNum={6} tableHeaders={tableHeaders} />
        </div>
      )}
      {data && (
        <PurchaseOrdersTable
          tableHeaders={tableHeaders}
          data={data.purchaseItems}
          mutate={mutate}
          totalCount={data.totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default PurchaseOrders;
