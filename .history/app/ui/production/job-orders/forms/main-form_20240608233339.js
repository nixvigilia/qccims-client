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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";

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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid spacing={2}>
          <Paper square={false}>
            <Box width="100%" sx={{p: 4}}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Box>
                    <AutoCompleteForm
                      selectedCustomer={selectedCustomer}
                      setSelectedCustomer={setSelectedCustomer}
                      title="Product Name"
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
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        variant="filled"
                        title="Product Name"
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].salesOrder`}
                        label="SO/PO"
                        size="small"
                        variant="filled"
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
                        variant="filled"
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
                        variant="filled"
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
                        variant="filled"
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
                        variant="filled"
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
            </Box>
          </Paper>
        </Grid>

        <div style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
          <SubmitButton
            isLoading={loading}
            title={isUpdate ? "Update Job Order" : "Create Job Order"}
          />
        </div>
      </Box>
    </FormProvider>
  );
}
