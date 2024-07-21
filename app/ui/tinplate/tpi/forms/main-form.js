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
                {/* Create new DB table for Skid */}
                <Grid item xs={4}>
                  <Box>
                    <AutoCompleteForm
                      // selectedDetails={selectedCustomer}
                      // setSelectedDetails={setSelectedCustomer}
                      columnName="skidsupname"
                      title="Supplier Name"
                      // endpoint="/api/customer/list"
                    />
                  </Box>
                </Grid>

                {/* Create a auto complete form for Vessel Name */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidvessel"
                    label="Vessel Name"
                    name="skidvessel"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidvessel", {
                      required: "Vessel Name is required",
                    })}
                    error={!!errors.skidvessel}
                    helperText={errors.skidvessel?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidcontract"
                    label="Contract No."
                    name="skidcontract"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidcontract", {
                      required: "Contract No. is required",
                    })}
                    error={!!errors.coilcontract}
                    helperText={errors.coilcontract?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Type of Material */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidtype"
                    label="Type of Material"
                    name="skidtype"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidtype", {
                      required: "Type of Material is required",
                    })}
                    error={!!errors.skidtype}
                    helperText={errors.skidtype?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidnumber"
                    label="Skid Number"
                    name="skidnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidnumber", {
                      required: "Skid Number is required",
                    })}
                    error={!!errors.skidnumber}
                    helperText={errors.skidnumber?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coil Number */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidcoilnumber"
                    label="Coil Number"
                    name="skidcoilnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidcoilnumber", {
                      required: "Coil Number is required",
                    })}
                    error={!!errors.skidcoilnumber}
                    helperText={errors.skidcoilnumber?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="skidtpinumber"
                    label="TPI Number"
                    name="skidtpinumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidtpinumber", {
                      required: "TPI Number is required",
                    })}
                    error={!!errors.skidtpinumber}
                    helperText={errors.skidtpinumber?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Thickness */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="skidthick"
                    label="Thickness and Size"
                    name="skidthick"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidthick", {
                      required: "Thickness and Size is required",
                    })}
                    error={!!errors.skidthick}
                    helperText={errors.skidthick?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Temper */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="skidtemp"
                    label="Temper"
                    name="skidtemp"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidtemp", {
                      required: "Temper is required",
                    })}
                    error={!!errors.skidtemp}
                    helperText={errors.skidtemp?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Net Weight */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="skidnetweight"
                    label="Net Weight"
                    name="skidnetweight"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidnetweight", {
                      required: "Net Weight is required",
                    })}
                    error={!!errors.skidnetweight}
                    helperText={errors.skidnetweight?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coating */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="skidcoat"
                    label="Coating"
                    name="skidcoat"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("skidcoat", {
                      required: "Coating is required",
                    })}
                    error={!!errors.skidcoat}
                    helperText={errors.skidcoat?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="skidrem"
                    label="Remarks"
                    name="skidrem"
                    multiline
                    rows={3}
                    InputLabelProps={{ shrink: true }}
                    {...register("skidrem")}
                    error={!!errors.skidrem}
                    helperText={errors.skidrem?.message}
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
                title={isUpdate ? "Skid" : "Create Skid"}
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
