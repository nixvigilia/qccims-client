"use client";
import {useState, useEffect} from "react";
import {useForm, FormProvider} from "react-hook-form";
import useSWR from "swr";
import {useDebounce} from "use-debounce";
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
import Button from "@mui/material/Button";
import AutoCompleteForm from "./auto-complete-form";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {postRequest, deleteRequest} from "@/lib/api/requestApi";
import {getData} from "@/lib/actions/data/getData";

export default function MainForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 300);

  const fetcher = (url) => getData(url);
  const {data, error, mutate} = useSWR(
    `/api/customer/list/?search=${debouncedInputValue}`,
    fetcher
  );

  useEffect(() => {
    if (selectedCustomer) {
      setInputValue(selectedCustomer.name);
    }
  }, [selectedCustomer]);

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

  async function handleDelete(productId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await deleteRequest(
        setLoading,
        `/api/quality/products/${productId}`
      );

      if (response?.status === 200) {
        mutate();
      } else {
        toast.error("Failed to delete product");
      }
    }
  }

  const customerProducts =
    selectedCustomer && data
      ? data.find((customer) => customer.id === selectedCustomer.id)
          ?.products || []
      : [];

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
              <Typography variant="h6" gutterBottom>
                Products
              </Typography>
              {error ? (
                <div>Failed to load</div>
              ) : !data ? (
                <div>Loading...</div>
              ) : (
                <>
                  {customerProducts.length > 0 && (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {customerProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.id}</TableCell>
                              <TableCell>{product.productName}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  onClick={() => handleDelete(product.id)}
                                  disabled={loading}
                                  sx={{fontSize: "12px"}}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
