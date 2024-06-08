"use client";

import {useState, useEffect} from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {createJobOrder, updateJobOrder} from "@/lib/api/delivery/jobOrderApi";
import {useRouter} from "next/navigation";
import {useForm, useFieldArray, FormProvider} from "react-hook-form";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AutoCompleteForm from "./auto-complete-form";
import dayjs from "dayjs";

export default function MainForm({initialData = {}, isUpdate = false}) {
  const router = useRouter();

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  // Preprocess initialData to format dates correctly
  const formattedInitialData = {
    ...initialData,
    jobDate: formatDate(initialData.jobDate),
    jobOrderItems: initialData.jobOrderItems?.map((item) => ({
      ...item,
      deliveryDate: formatDate(item.deliveryDate),
    })) || [
      {
        deliveryDate: "",
        product: "",
        salesOrder: "",
        quantity: "",
        unit: "",
        description: "",
        remarks: "",
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({defaultValues: formattedInitialData});

  const {fields, append, remove} = useFieldArray({
    control,
    name: "jobOrderItems",
  });

  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      setSelectedCustomer({
        id: initialData.customer.id,
        name: initialData.customer.companyName,
      });
    }
  }, []);

  function redirect() {
    router.push("/delivery/job-orders");
  }

  async function onSubmit(data) {
    data.customerId = selectedCustomer?.id || null;

    if (isUpdate) {
      // Update request
      await updateJobOrder(
        setLoading,
        `api/delivery/job/update/${initialData.id}`,
        data,
        "Job Order",
        redirect,
        reset
      );
    } else {
      await createJobOrder(
        setLoading,
        "api/delivery/job/new",
        data,
        "Job Order",
        reset
      );
    }
  }

  const handleRemove = async (index) => {
    const item = fields[index];
    if (item.description || item.quantity || item.unit) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        remove(index);
        Swal.fire("Removed!", "The item has been removed.", "success");
      }
    } else {
      remove(index);
    }
  };

  return (
    <FormProvider {...{register, control, handleSubmit, reset}}>
      <Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Paper square={false}>
              <Box width="100%" sx={{p: 4}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="jobDate"
                      label="Job Order Date"
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

                  <Grid item xs={12}>
                    <AutoCompleteForm
                      selectedCustomer={selectedCustomer}
                      setSelectedCustomer={setSelectedCustomer}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="remarks"
                      label="Remarks"
                      name="remarks"
                      multiline
                      rows={4}
                      {...register("remarks")}
                      error={!!errors.remarks}
                      helperText={errors.remarks?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={5}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Item List
                </Typography>
                <Typography variant="body2">
                  Delivery date, product name, quantity ...
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Paper square={false}>
                <Box width="100%" sx={{p: 4}}>
                  {fields.map((field, index) => (
                    <Grid container spacing={2} key={field.id}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id={`jobOrderItems[${index}].deliveryDate`}
                          label="Delivery Date"
                          name={`jobOrderItems[${index}].deliveryDate`}
                          type="date"
                          InputLabelProps={{shrink: true}}
                          {...register(`jobOrderItems[${index}].deliveryDate`)}
                          error={!!errors.jobOrderItems?.[index]?.deliveryDate}
                          helperText={
                            errors.jobOrderItems?.[index]?.deliveryDate?.message
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id={`jobOrderItems[${index}].product`}
                          label="Product"
                          name={`jobOrderItems[${index}].product`}
                          {...register(`jobOrderItems[${index}].product`)}
                          error={!!errors.jobOrderItems?.[index]?.product}
                          helperText={
                            errors.jobOrderItems?.[index]?.product?.message
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id={`jobOrderItems[${index}].salesOrder`}
                          label="SO/PO"
                          name={`jobOrderItems[${index}].salesOrder`}
                          {...register(`jobOrderItems[${index}].salesOrder`)}
                          error={!!errors.jobOrderItems?.[index]?.salesOrder}
                          helperText={
                            errors.jobOrderItems?.[index]?.salesOrder?.message
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          required
                          fullWidth
                          id={`jobOrderItems[${index}].quantity`}
                          label="Quantity"
                          name={`jobOrderItems[${index}].quantity`}
                          type="number"
                          {...register(`jobOrderItems[${index}].quantity`, {
                            required: "Quantity is required",
                          })}
                          error={!!errors.jobOrderItems?.[index]?.quantity}
                          helperText={
                            errors.jobOrderItems?.[index]?.quantity?.message
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          required
                          fullWidth
                          id={`jobOrderItems[${index}].unit`}
                          label="Unit"
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
                          multiline
                          rows={2}
                          {...register(`jobOrderItems[${index}].remarks`)}
                          error={!!errors.jobOrderItems?.[index]?.remarks}
                          helperText={
                            errors.jobOrderItems?.[index]?.remarks?.message
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      append({
                        product: "",
                        salesOrder: "",
                        deliveryDate: "",
                        quantity: "",
                        unit: "",
                        description: "",
                        remarks: "",
                      })
                    }
                    sx={{mt: 2}}
                  >
                    Add Item
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{mt: 4, mb: 4}} />

          <div
            style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}
          >
            <SubmitButton
              isLoading={loading}
              title={isUpdate ? "Update Job Order" : "Create Job Order"}
            />
          </div>
        </Box>
      </Box>
    </FormProvider>
  );
}
