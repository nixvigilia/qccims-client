"use client";

import {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Header from "./components/header";
import JobOrderInfo from "./components/job-order-info";
import ProductInfo from "./components/product-info";
import ProductTable from "./components/product-table";
import ProductSpecsDetails from "./components/product-specs-details";
import SpecsTableTop from "./components/specs-table-top";
import SpecsTableLeft from "./components/specs-table-left";
import SpecsTableRight from "./components/specs-table-right";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";
import {useDebounce} from "use-debounce";

export default function PrintLayout({
  initialData = {},
  itemId,
  isUpdate = false,
}) {
  const {jobOrder, product} = initialData;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSpecs, setSelectedSpecs] = useState("");
  const [debouncedInputValue] = useDebounce(selectedSpecs, 300);

  const fetcher = (url) => getData(url);
  const {data, error} = useSWR(
    `/api/production/product-specs/list?search=${debouncedInputValue}&customerId=${product?.customerId}`,
    fetcher
  );

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSpecs(selectedProduct.name);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const productSpecifications =
    selectedProduct && data
      ? data.find((product) => product.id === selectedProduct.id) || []
      : [];

  return (
    <Box mt={4}>
      {/* Print button */}
      <Box sx={{display: "flex", justifyContent: "flex-end", mb: 2}}>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      {/* Print section */}
      <Box id="print-section">
        <Grid container spacing={2}>
          <Header />
          <JobOrderInfo jobOrder={jobOrder} />
          <ProductInfo product={product} data={initialData} />
          <ProductTable />
          <ProductSpecsDetails
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            setSelectedSpecs={setSelectedSpecs}
            product={product}
            canSize={productSpecifications?.productSpecs?.canSize}
          />

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <SpecsTableTop
                  productSpecs={productSpecifications?.productSpecs || []}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <SpecsTableLeft
              productSpecs={productSpecifications?.productSpecs || []}
            />
          </Grid>

          <Grid item xs={6}>
            <SpecsTableRight
              productSpecs={productSpecifications?.productSpecs || []}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
