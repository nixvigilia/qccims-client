"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import SubmitButton from "@/components/FormInputs/SubmitButton";
// import { createJobOrder, updateJobOrder } from "@/lib/api/delivery/jobOrderApi";
import AutoCompleteForm from "./auto-complete-form";

export default function MainForm({
  initialData = {},
  mutate,
  isUpdate = false,
}) {
  const router = useRouter();

  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  const formattedInitialData = {
    ...initialData,
    jobDate: formatDate(initialData.jobDate),
    jobOrderItems: initialData.jobOrderItems?.map((item) => ({
      ...item,
      deliveryDate: formatDate(item.deliveryDate),
      productId: item.product.id,
      unitId: item.unit.id,
    })) || [
      {
        deliveryDate: "",
        salesOrder: "",
        quantity: "",
        unitId: "",
        remarks: "",
        productId: "",
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: formattedInitialData });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobOrderItems",
  });

  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [unit, setUnit] = useState(null);

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

  function redirect() {
    router.push("/production/job-orders");
  }

  async function onSubmit(data) {
    data.customerId = selectedCustomer?.id || null;
    data.jobOrderItems = data.jobOrderItems.map((item, index) => ({
      ...item,
      productId: selectedProducts[index]?.id || item.productId,
      unitId: unit?.id || item.unitId,
    }));

    const itemsToUpdate = data.jobOrderItems.filter((item) => item.id);
    const itemsToCreate = data.jobOrderItems.filter((item) => !item.id);

    const updatePayload = {
      ...data,
      category: "print",
      jobOrderItemsToUpdate: itemsToUpdate,
      jobOrderItemsToCreate: itemsToCreate,
    };

    if (isUpdate) {
      await updateJobOrder(
        setLoading,
        `api/delivery/job/update/${initialData.id}`,
        updatePayload,
        "Job Order",
        redirect,
        reset
      );
      mutate();
    } else {
      const response = await createJobOrder(
        setLoading,
        "api/delivery/job/new",
        updatePayload,
        "Job Order",
        reset
      );

      if (response.status === 201) {
        router.push(`${response.data.id}`);
      }
    }
  }

  const handleRemove = async (index) => {
    const item = fields[index];
    if (item.quantity || item.unit) {
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
    <FormProvider {...{ register, control, handleSubmit, reset }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid spacing={2}>
          <Paper square={false}>
            <Box width="100%" sx={{ p: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Tinplate Specification</Typography>
                </Grid>
                {/* Create new DB table for TPI */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="tpidate"
                    label="Date"
                    name="tpidate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpidate", {
                      required: "Date Received is required",
                    })}
                    error={!!errors.tpidate}
                    helperText={errors.tpidate?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="tpisource"
                    label="Source"
                    name="tpisource"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpisource", {
                      required: "Source is required",
                    })}
                    error={!!errors.tpisource}
                    helperText={errors.tpisource?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpiskidnumber"
                    label="Skid Number"
                    name="tpiskidnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpiskidnumber", {
                      required: "Skid Number is required",
                    })}
                    error={!!errors.tpiskidnumber}
                    helperText={errors.tpiskidnumber?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpicoilnumber"
                    label="Coil Number"
                    name="tpicoilnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpicoilnumber", {
                      required: "Coil Number is required",
                    })}
                    error={!!errors.tpicoilnumber}
                    helperText={errors.tpicoilnumber?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpitype"
                    label="Type"
                    name="tpitype"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpitype", {
                      required: "Type is required",
                    })}
                    error={!!errors.tpitype}
                    helperText={errors.tpitype?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpisize"
                    label="Size"
                    name="tpisize"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpisize", {
                      required: "Size is required",
                    })}
                    error={!!errors.tpisize}
                    helperText={errors.tpisize?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpithick"
                    label="Thickness"
                    name="tpithick"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpithick", {
                      required: "Thickness is required",
                    })}
                    error={!!errors.tpithick}
                    helperText={errors.tpithick?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpitemp"
                    label="Temper"
                    name="tpitemp"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpitemp", {
                      required: "Temper is required",
                    })}
                    error={!!errors.tpitemp}
                    helperText={errors.tpitemp?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpicoat"
                    label="Coating"
                    name="tpicoat"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpicoat", {
                      required: "Coating is required",
                    })}
                    error={!!errors.tpicoat}
                    helperText={errors.tpicoat?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="tpiothers"
                    label="Others"
                    name="tpiothers"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("tpiothers", {
                      required: "Others is required",
                    })}
                    error={!!errors.tpiothers}
                    helperText={errors.tpiothers?.message}
                  />
                </Grid>
              </Grid>
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
                title={isUpdate ? "Update TPI" : "Create TPI"}
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
