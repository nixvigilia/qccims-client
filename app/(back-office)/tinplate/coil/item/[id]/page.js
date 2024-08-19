"use client";
import useSWR from "swr";
import { fetchWithToken } from "@/lib/actions/data/getData"; // Adjust the path if needed
import PageBreadCrumbs from "@/app/ui/tinplate/coil/page-bread-crumbs";
import MainView from "@/app/ui/tinplate/coil/view/main-view";

export default function Page({ params }) {
  const { id } = params;

  // Define the fetcher function
  const fetcher = (url) => fetchWithToken(url);

  // Fetch data from the API using SWR
  const { data, error } = useSWR(
    id ? `/api/tinplate/whole/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageBreadCrumbs
        lastPathName={data?.contract} // Adjust the breadcrumb's last path name as needed
      />
      <MainView initialData={data} />
    </>
  );
}
