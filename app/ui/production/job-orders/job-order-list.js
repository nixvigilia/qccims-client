"use client";
import React, {useState, useCallback} from "react";
import FilterForm from "./forms/filter-form";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";
// import HorizontalNav from "./nav/horizontal-nav";
import {useSearchParams} from "next/navigation";
import {useDebounce} from "use-debounce";
import TableSkeleton from "./skeletons/table-skeleton";
import MainTable from "./tables/main-table";

const ITEMS_PER_PAGE = 20;

const JobOrderList = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  const fetcher = (url) => getData(url);
  const {data, error, mutate} = useSWR(
    `/api/delivery/job/orders?status=${status}&search=${debouncedSearch}&page=${page}&limit=${ITEMS_PER_PAGE}&category=tin`,
    fetcher
  );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const tableHeaders = [
    {label: "Job Order ID"},
    {label: "Customer"},
    {label: "Order Date"},
    {label: "Delivery Date"},
    {label: "Status"},
    {label: "Action", align: "center"},
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
          data={data}
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

export default JobOrderList;
