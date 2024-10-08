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

const SpecificationList = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    `/api/production/product-specs/list?search=${debouncedSearch}&page=${page}&limit=${ITEMS_PER_PAGE}&list=${true}`,
    fetcher,
    {revalidateOnFocus: true}
  );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const tableHeaders = [
    {label: "Product"},
    {label: "Customer "},
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
          totalCount={data.totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SpecificationList;
