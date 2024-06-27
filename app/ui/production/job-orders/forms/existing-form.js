"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, useFieldArray, FormProvider} from "react-hook-form";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {createJobOrder, updateJobOrder} from "@/lib/api/delivery/jobOrderApi";
import AutoCompleteForm from "./auto-complete-form";
import {serverApi} from "@/lib/config/axios";
import Cookies from "js-cookie";

export default function ExistingForm({initialData = {}, isUpdate = false}) {
  const router = useRouter();
  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  const [initialFormData, setInitialFormData] = useState({
    ...initialData,
    jobDate: formatDate(initialData.jobDate),
    jobOrderItems: initialData.jobOrderItems?.map((item) => ({
      productId: item.product.id,
    })) || [
      {
        deliveryDate: "",
        salesOrder: "",
        quantity: "",
        unit: "",
        remarks: "",
        productId: "",
      },
    ],
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialFormData});

  useEffect(() => {
    reset(initialFormData);
  }, [initialFormData, reset]);

  console.log(initialFormData);

  const {fields, append, remove} = useFieldArray({
    control,
    name: "jobOrderItems",
  });

  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUpdate && initialData.customer) {
      setSelectedCustomer({
        id: initialData.customer.id,
        name: initialData.customer.companyName,
      });
      setSelectedProducts(
        initialData.jobOrderItems.map((item) => ({
          id: item.product.id,
          name: item.product.productName,
        }))
      );
    }
  }, [initialData, isUpdate]);

  useEffect(() => {
    const fetchJobOrderDetails = async () => {
      if (selectedJobOrder) {
        setSelectedCustomer(null);

        const token = Cookies.get("__qcc_session") || "";
        const response = await serverApi.get(
          `/api/delivery/job/orders/${selectedJobOrder.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {customer, ...data} = response?.data;

        if (response.status === 200) {
          setIsLoading(true);
          setSelectedCustomer({
            id: customer.id,
            name: customer.companyName,
          });

          setSelectedProducts(
            data.jobOrderItems.map((item) => ({
              id: item.product.id,
              name: item.product.productName,
            }))
          );

          setInitialFormData({
            jobOrderItems:
              data.jobOrderItems?.map((item) => ({
                productId: item.product.id,
              })) || [],
          });

          setIsLoading(false);
        }

        console.log(response);
      }
    };

    if (selectedJobOrder) {
      fetchJobOrderDetails();
    }
  }, [selectedJobOrder]);

  function redirect() {
    router.push("/production/job-orders");
  }

  async function onSubmit(data) {
    data.customerId = selectedCustomer?.id || null;
    data.jobOrderItems = data.jobOrderItems.map((item, index) => ({
      ...item,
      productId: selectedProducts[index]?.id || item.productId,
    }));

    console.log(data);

    const itemsToUpdate = data.jobOrderItems.filter((item) => item.id);
    const itemsToCreate = data.jobOrderItems.filter((item) => !item.id);

    const updatePayload = {
      ...data,
      category: "print",
      jobOrderItemsToUpdate: itemsToUpdate,
      jobOrderItemsToCreate: itemsToCreate,
    };

    // if (isUpdate) {
    //   await updateJobOrder(
    //     setLoading,
    //     `api/delivery/job/update/${initialData.id}`,
    //     updatePayload,
    //     "Job Order",
    //     redirect,
    //     reset
    //   );
    // } else {
    //   const response = await createJobOrder(
    //     setLoading,
    //     "api/delivery/job/new",
    //     updatePayload,
    //     "Job Order",
    //     reset
    //   );

    //   if (response.status === 201) {
    //     router.push(`${response.data.id}`);
    //   }
    // }
  }

  const handleRemove = (index) => {
    remove(index);
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };

  return (
    <FormProvider {...{register, control, handleSubmit, reset}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid spacing={2}>
          <Paper square={false}>
            <Box width="100%" sx={{p: 4}}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Box>
                    <AutoCompleteForm
                      selectedDetails={selectedJobOrder}
                      setSelectedDetails={setSelectedJobOrder}
                      columnName="jobNumber"
                      title="JOB ORDER ID"
                      endpoint="/api/delivery/job/orders"
                      category="tin"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{mt: 4, mb: 4}} />
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Box>
                    <AutoCompleteForm
                      selectedDetails={selectedCustomer}
                      setSelectedDetails={setSelectedCustomer}
                      columnName="companyName"
                      title="Customer Name"
                      endpoint="/api/customer/list"
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="jobDate"
                    label="Date"
                    name="jobDate"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    {...register("jobDate", {
                      required: "Job Date is required",
                    })}
                    error={!!errors.jobDate}
                    helperText={errors.jobDate?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    name="remarks"
                    multiline
                    rows={3}
                    InputLabelProps={{shrink: true}}
                    {...register("remarks")}
                    error={!!errors.remarks}
                    helperText={errors.remarks?.message}
                  />
                </Grid>
              </Grid>

              <Divider sx={{mt: 4, mb: 4}} />

              <Box width="100%">
                <Typography variant="h6" pb={2}>
                  Item List
                </Typography>
                {fields.map((field, index) => (
                  <Grid container spacing={2} key={field.id}>
                    <Grid item xs={12} sm={6}>
                      <AutoCompleteForm
                        selectedDetails={selectedProducts[index]}
                        setSelectedDetails={(newValue) => {
                          const updatedProducts = [...selectedProducts];
                          updatedProducts[index] = newValue;
                          setSelectedProducts(updatedProducts);
                        }}
                        columnName="productName"
                        variant="outlined"
                        title="Product Name"
                        endpoint="/api/quality/products/list"
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].salesOrder`}
                        label="PO Number"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        name={`jobOrderItems[${index}].salesOrder`}
                        {...register(`jobOrderItems[${index}].salesOrder`)}
                        error={!!errors.jobOrderItems?.[index]?.salesOrder}
                        helperText={
                          errors.jobOrderItems?.[index]?.salesOrder?.message
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].deliveryDate`}
                        label="Delivery Date"
                        name={`jobOrderItems[${index}].deliveryDate`}
                        type="date"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].deliveryDate`)}
                        error={!!errors.jobOrderItems?.[index]?.deliveryDate}
                        helperText={
                          errors.jobOrderItems?.[index]?.deliveryDate?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        fullWidth
                        id={`jobOrderItems[${index}].quantity`}
                        label="Quantity"
                        name={`jobOrderItems[${index}].quantity`}
                        type="number"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].quantity`, {
                          required: "Quantity is required",
                        })}
                        error={!!errors.jobOrderItems?.[index]?.quantity}
                        helperText={
                          errors.jobOrderItems?.[index]?.quantity?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        fullWidth
                        id={`jobOrderItems[${index}].unit`}
                        label="Unit"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        name={`jobOrderItems[${index}].unit`}
                        {...register(`jobOrderItems[${index}].unit`, {
                          required: "Unit is required",
                        })}
                        error={!!errors.jobOrderItems?.[index]?.unit}
                        helperText={
                          errors.jobOrderItems?.[index]?.unit?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].remarks`}
                        label="Remarks"
                        name={`jobOrderItems[${index}].remarks`}
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].remarks`)}
                        error={!!errors.jobOrderItems?.[index]?.remarks}
                        helperText={
                          errors.jobOrderItems?.[index]?.remarks?.message
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      mb={3}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        startIcon={<DeleteTwoToneIcon />}
                        color="error"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  color="success"
                  startIcon={<AddBoxTwoToneIcon />}
                  onClick={() =>
                    append({
                      salesOrder: "",
                      deliveryDate: "",
                      quantity: "",
                      unit: "",
                      remarks: "",
                      productId: "",
                    })
                  }
                  sx={{mt: 2}}
                >
                  Add Item
                </Button>
              </Box>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                padding: "20px",
              }}
            >
              <SubmitButton
                isLoading={loading}
                title={isUpdate ? "Update Job Order" : "Create Job Order"}
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
