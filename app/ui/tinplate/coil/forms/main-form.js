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
                    id="coilcontract"
                    label="Contract No."
                    name="coilcontract"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilcontract", {
                      required: "Contract No. is required",
                    })}
                    error={!!errors.coilcontract}
                    helperText={errors.coilcontract?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <AutoCompleteForm
                      // selectedDetails={selectedCustomer}
                      // setSelectedDetails={setSelectedCustomer}
                      columnName="coilsupname"
                      title="Supplier Name"
                      // endpoint="/api/customer/list"
                    />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="coildatercv"
                    label="Date Received"
                    name="coildatercv"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("coildatercv", {
                      required: "Date Received is required",
                    })}
                    error={!!errors.jobDate}
                    helperText={errors.jobDate?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Vessel Name */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="coilvessel"
                    label="Vessel Name"
                    name="coilvessel"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilvessel", {
                      required: "Vessel Name is required",
                    })}
                    error={!!errors.coilvessel}
                    helperText={errors.coilvessel?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coil Number */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="coilnumber"
                    label="Coil Number"
                    name="coilnumber"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilnumber", {
                      required: "Coil Number is required",
                    })}
                    error={!!errors.coilnumber}
                    helperText={errors.coilnumber?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Type of Material */}
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="coiltype"
                    label="Type of Material"
                    name="coiltype"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coiltype", {
                      required: "Type of Material is required",
                    })}
                    error={!!errors.coiltype}
                    helperText={errors.coiltype?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Thickness */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="coilthick"
                    label="Thickness"
                    name="coilthick"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilthick", {
                      required: "Thickness is required",
                    })}
                    error={!!errors.coilthick}
                    helperText={errors.coilthick?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Width */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="coilwidth"
                    label="Width"
                    name="coilwidth"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilwidth", {
                      required: "Width is required",
                    })}
                    error={!!errors.coilwidth}
                    helperText={errors.coilwidth?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Temper */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="coiltemp"
                    label="Temper"
                    name="coiltemp"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coiltemp", {
                      required: "Temper is required",
                    })}
                    error={!!errors.coiltemp}
                    helperText={errors.coiltemp?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Coating */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="coilcoat"
                    label="Coating"
                    name="coilcoat"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilcoat", {
                      required: "Coating is required",
                    })}
                    error={!!errors.coilcoat}
                    helperText={errors.coilcoat?.message}
                  />
                </Grid>

                {/* Create a auto complete form for Net Weight */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="coilweight"
                    label="Net Weight"
                    name="coilweight"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("coilweight", {
                      required: "Net Weight is required",
                    })}
                    error={!!errors.coilweight}
                    helperText={errors.coilweight?.message}
                  />
                </Grid>

                {/* category is not in the old database */}
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    name="category"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    {...register("category", {
                      required: "Coating is required",
                    })}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="coilrem"
                    label="Remarks"
                    name="coilrem"
                    multiline
                    rows={3}
                    InputLabelProps={{ shrink: true }}
                    {...register("coilrem")}
                    error={!!errors.coilrem}
                    helperText={errors.coilrem?.message}
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
                title={isUpdate ? "Update Job Order" : "Create Coil Whole"}
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
