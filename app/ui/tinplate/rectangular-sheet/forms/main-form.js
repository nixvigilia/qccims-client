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
                {/* Create a auto complete form for contract number */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cutcontract"
                    label="Contract No."
                    name="cutcontract"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutcontract", {
                      required: "Contract No. is required",
                    })}
                    error={!!errors.cutcontract}
                    helperText={errors.cutcontract?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <AutoCompleteForm
                      // selectedDetails={selectedCustomer}
                      // setSelectedDetails={setSelectedCustomer}
                      columnName="cutsupnames"
                      title="Supplier Name"
                      // endpoint="/api/customer/list"
                    />
                  </Box>
                </Grid>

                {/* no record in old db */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    name="category"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("category", {
                      required: "Category is required",
                    })}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cutdatercv"
                    label="Date Received"
                    name="cutdatercv"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutdatercv", {
                      required: "Date Received is required",
                    })}
                    error={!!errors.cutdatercv}
                    helperText={errors.cutdatercv?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cutdatecut"
                    label="Date Cut"
                    name="cutdatecut"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutdatecut", {
                      required: "Date Cut is required",
                    })}
                    error={!!errors.cutdatecut}
                    helperText={errors.cutdatecut?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Vessel Name */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cutvessel"
                    label="Vessel Name"
                    name="cutvessel"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutvessel", {
                      required: "Vessel Name is required",
                    })}
                    error={!!errors.cutvessel}
                    helperText={errors.cutvessel?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coil Number */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cutcoilnumber"
                    label="Coil Number"
                    name="cutcoilnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutcoilnumber", {
                      required: "Coil Number is required",
                    })}
                    error={!!errors.cutcoilnumber}
                    helperText={errors.cutcoilnumber?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Type of Material */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cuttype"
                    label="Type of Material"
                    name="cuttype"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cuttype", {
                      required: "Type of Material is required",
                    })}
                    error={!!errors.cuttype}
                    helperText={errors.cuttype?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Thickness */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutthick"
                    label="Thickness"
                    name="cutthick"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutthick", {
                      required: "Thickness is required",
                    })}
                    error={!!errors.cutthick}
                    helperText={errors.cutthick?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Width */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutwidth"
                    label="Width"
                    name="cutwidth"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutwidth", {
                      required: "Width is required",
                    })}
                    error={!!errors.cutwidth}
                    helperText={errors.cutwidth?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Temper */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cuttemp"
                    label="Temper"
                    name="cuttemp"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cuttemp", {
                      required: "Temper is required",
                    })}
                    error={!!errors.cuttemp}
                    helperText={errors.cuttemp?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coating */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutcoat"
                    label="Coating"
                    name="cutcoat"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutcoat", {
                      required: "Coating is required",
                    })}
                    error={!!errors.cutcoat}
                    helperText={errors.cutcoat?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutweight"
                    label="Weight"
                    name="cutweight"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutweight", {
                      required: "Weight is required",
                    })}
                    error={!!errors.cutweight}
                    helperText={errors.cutweight?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cuttpi"
                    label="TPI No."
                    name="cuttpi"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cuttpi", {
                      required: "TPI No. is required",
                    })}
                    error={!!errors.cuttpi}
                    helperText={errors.cuttpi?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutskid"
                    label="Skid No."
                    name="cutskid"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutskid", {
                      required: "Skid No. is required",
                    })}
                    error={!!errors.cutskid}
                    helperText={errors.cutskid?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Weight */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutnetweight"
                    label="Net Weight"
                    name="cutnetweight"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutnetweight", {
                      required: "Net Weight is required",
                    })}
                    error={!!errors.cutnetweight}
                    helperText={errors.cutnetweight?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutlength"
                    label="Length"
                    name="cutlength"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutlength", {
                      required: "Length is required",
                    })}
                    error={!!errors.cutlength}
                    helperText={errors.cutlength?.message}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="cutsheet"
                    label="Cut Sheets"
                    name="cutsheet"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("cutsheet", {
                      required: "Cut Sheets is required",
                    })}
                    error={!!errors.cutsheet}
                    helperText={errors.cutsheet?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="cutrem1"
                    label="Remarks"
                    name="cutrem1"
                    multiline
                    rows={3}
                    InputLabelProps={{ shrink: true }}
                    {...register("cutrem1")}
                    error={!!errors.cutrem1}
                    helperText={errors.cutrem1?.message}
                  />
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    padding: "20px",
                  }}
                >
                  {/* update condition in this button */}
                  <SubmitButton
                    isLoading={loading}
                    title={
                      isUpdate
                        ? "Update Rectangular Sheet"
                        : "Create Rectangular Sheet"
                    }
                  />
                </div>
              </Grid>

              <Divider sx={{ mt: 4, mb: 4 }} />

              <Box width="100%">
                <Typography variant="h6" pb={2}>
                  Consume this item?
                </Typography>
                <Grid
                  container
                  spacing={2}
                  // key={field.id}
                >
                  {/* this field is connected to date consumed of consumed coils */}
                  <Grid item xs={4}>
                    <TextField
                      required
                      fullWidth
                      id="condatecon"
                      label="Date Consumed"
                      name="condatecon"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register("condatecon", {
                        required: "Date Consumed is required",
                      })}
                      error={!!errors.condatecon}
                      helperText={errors.condatecon?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="cutrem2"
                      label="Remarks"
                      name="cutrem2"
                      multiline
                      rows={3}
                      InputLabelProps={{ shrink: true }}
                      {...register("cutrem2")}
                      error={!!errors.cutrem2}
                      helperText={errors.cutrem2?.message}
                    />
                  </Grid>
                </Grid>

                {/* cut note is in DB but not in the previous UI of qcc */}
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
                title={
                  isUpdate ? "Update Rectangular Sheet" : "Rectangular Sheet"
                }
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
