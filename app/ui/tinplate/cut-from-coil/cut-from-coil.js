"use client";
import React, { useState, useCallback } from "react";
import FilterForm from "./forms/filter-form";
import { fetchWithToken } from "@/lib/actions/data/getData";
// import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import TableSkeleton from "./skeletons/table-skeleton";
import MainTable from "./tables/main-table";

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  // const {data, error, mutate} = useSWR(
  //   `/api/procurement/purchase/orders?status=${status}&search=${debouncedSearch}&page=${page}&limit=${ITEMS_PER_PAGE}`,
  //   fetchWithToken
  // );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const tableHeaders = [
    { label: "Contract No." },
    { label: "Supplier" },
    { label: "Vessel Name" },
    { label: "Date Received" },
    { label: "Cut Date" },
    { label: "COIL#" },
    { label: "Skid" },
    { label: "TPI" },
    { label: "Action", align: "center" },
  ];

  return (
    <>
      <FilterForm onSearchChange={handleSearchChange} />
      {error && <div className="p-6">Failed to load</div>}
      {!data && !error && (
        <div className="p-6">
          <TableSkeleton rowsNum={6} tableHeaders={tableHeaders} />
        </div>
      )}
      {data && (
        <MainTable
          tableHeaders={tableHeaders}
          data={data.purchaseOrders}
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

export default ProductList;
