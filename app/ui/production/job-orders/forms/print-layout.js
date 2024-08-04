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

export default function PrintLayout({
  initialData = {},
  itemId,
  isUpdate = false,
  mutate,
}) {
  const {jobOrder, product} = initialData;

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore the original state
  };

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
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <SpecsTableTop />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <SpecsTableLeft />
          </Grid>

          <Grid item xs={6}>
            <SpecsTableRight />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
