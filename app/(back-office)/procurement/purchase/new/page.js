"use client";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import {useDebounce} from "use-debounce";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";
import SearchAsync from "@/components/Procurement/PurchaseOrders/Forms/SearchAsync";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 300);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    `/api/procurement/suppliers/list?search=${debouncedInputValue}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  return (
    <>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={5}
      >
        <Grid item>
          <Typography variant="h5" fontWeight="bold" component="div">
            Create a purchase order
          </Typography>
        </Grid>
      </Grid>

      <SearchAsync
        suppliers={data}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedSupplier={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
      />
    </>
  );
}
