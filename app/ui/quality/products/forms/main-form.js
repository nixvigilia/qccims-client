"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, FormProvider} from "react-hook-form";
import Swal from "sweetalert2";
import {toast} from "react-hot-toast";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AutoCompleteForm from "./auto-complete-form";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {postRequest} from "@/lib/api/requestApi"; // Ensure this is correctly pointing to your request API functions

export default function MainForm({data, error, mutate}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerProducts, setCustomerProducts] = useState([]);

  useEffect(() => {
    if (selectedCustomer && data) {
      setCustomerProducts(
        data.filter((product) => product.customerId === selectedCustomer.id)
      );
    }
  }, [selectedCustomer, data]);

  async function onSubmit(formData) {
    formData.customerId = selectedCustomer?.id || null;

    if (!formData.customerId) {
      Swal.fire("Error", "Please select a customer", "error");
      return;
    }

    const response = await postRequest(
      setLoading,
      "/api/quality/products/new",
      formData,
      "Product",
      reset
    );

    if (response?.status === 201) {
      mutate();
    }
  }

  return (
    <FormProvider {...{register, control, handleSubmit, reset}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper square={false} sx={{p: 4, mt: 4}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutoCompleteForm
                    selectedDetails={selectedCustomer}
                    setSelectedDetails={setSelectedCustomer}
                    columnName="companyName"
                    title="Customer Name"
                    endpoint="/api/customer/list"
                    category="tin"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="productName"
                    label="Product Name"
                    name="productName"
                    {...register("productName", {
                      required: "Product Name is required",
                    })}
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                  />
                </Grid>
              </Grid>
              <Divider sx={{mt: 4, mb: 4}} />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <SubmitButton isLoading={loading} title="Create Product" />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper square={false} sx={{p: 4, mt: 4}}>
              {customerProducts.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Products under {selectedCustomer?.companyName}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product ID</TableCell>
                          <TableCell>Product Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customerProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
