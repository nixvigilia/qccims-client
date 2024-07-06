"use client";

import { useState, useEffect } from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  createPurchase,
  updatePurchase,
} from "@/lib/api/procurement/purchaseApi";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SearchAsync from "./auto-complete-form";
import dayjs from "dayjs";

export default function MainForm({ initialData = {}, isUpdate = false }) {
  const router = useRouter();

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  // Preprocess initialData to format dates correctly
  const formattedInitialData = {
    ...initialData,
    orderDate: formatDate(initialData.orderDate),
    items:
      initialData.items?.map((item) => ({
        ...item,
        deliveryDate: formatDate(item.deliveryDate),
      })) || [],
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
    name: "items",
  });

  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedVessel, setSelectedVessel] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      setSelectedSupplier({
        id: initialData.supplier.id,
        name: initialData.supplier.supplierName,
      });
    }
  }, []);

  function redirect() {
    router.push("/dashboard/purchases");
  }

  async function onSubmit(data) {
    data.supplierId = selectedSupplier?.id || null;

    if (isUpdate) {
      // Update request
      await updatePurchase(
        setLoading,
        `api/procurement/purchase/${initialData.id}`,
        data,
        "Purchase",
        redirect,
        reset
      );
    } else {
      await createPurchase(
        setLoading,
        "api/procurement/purchase/new",
        data,
        "Purchase",
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
    <FormProvider>
      <Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="dateReceived"
                label="Date Received"
                name="dateReceived"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("dateReceived", {
                  required: "Date Received is required",
                })}
                // error={!!errors.orderDate}
                // helperText={errors.orderDate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="cutDate"
                label="Cut Date"
                name="cutDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("cutDate", {
                  required: "Cut Date is required",
                })}
                // error={!!errors.orderDate}
                // helperText={errors.orderDate?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SearchAsync
                selectedSupplier={selectedSupplier}
                setSelectedSupplier={setSelectedSupplier}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="contractNo"
                label="Contract No."
                name="contractNo"
                {...register("contractNo", {
                  required: "Contract No. is required",
                })}
                // error={!!errors.term}
                // helperText={errors.term?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* set SearchAsync for vessel name in auto-complete-form */}
              <TextField
                required
                fullWidth
                id="vesselName"
                label="Vessel Name"
                name="vesselName"
                {...register("vesselName", {
                  required: "Vessel Name is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="coilNo"
                label="Coil No."
                name="coilNo"
                {...register("coilNo", {
                  required: "Coil No. is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* set SearchAsync for material type in auto-complete-form */}
              <TextField
                required
                fullWidth
                id="materialType"
                label="Type of Material"
                name="materialType"
                {...register("materialType", {
                  required: "Type of Material is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="skid"
                label="Skid"
                name="skid"
                {...register("skid", {
                  required: "Skid is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="tpi"
                label="TPI"
                name="tpi"
                {...register("tpi", {
                  required: "TPI is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="thickness"
                label="Thickness"
                name="thickness"
                {...register("thickness", {
                  required: "Thickness is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="width"
                label="Width"
                name="width"
                {...register("width", {
                  required: "Width is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lenght"
                label="Length"
                name="lenght"
                {...register("lenght", {
                  required: "Length is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="t"
                label="T"
                name="t"
                {...register("t", {
                  required: "T is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="coating"
                label="Coating"
                name="coating"
                {...register("coating", {
                  required: "Coating is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="netWeight"
                label="Net Wt. (kg)"
                name="netWeight"
                {...register("netWeight", {
                  required: "Net Wt. (kg) is required",
                })}
                // error={!!errors.requestor}
                // helperText={errors.requestor?.message}
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

          <Box mt={4} width="100%">
            <Typography variant="h6">Coil Cut Items</Typography>
            {fields.map((field, index) => (
              <Grid container spacing={2} key={field.id} mt={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].deliveryDate`}
                    label="Delivery Date"
                    name={`items[${index}].deliveryDate`}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register(`items[${index}].deliveryDate`)}
                    error={!!errors.items?.[index]?.deliveryDate}
                    helperText={errors.items?.[index]?.deliveryDate?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].itemCode`}
                    label="Item Code"
                    name={`items[${index}].itemCode`}
                    {...register(`items[${index}].itemCode`)}
                    error={!!errors.items?.[index]?.itemCode}
                    helperText={errors.items?.[index]?.itemCode?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].locationCode`}
                    label="Location Code"
                    name={`items[${index}].locationCode`}
                    {...register(`items[${index}].locationCode`)}
                    error={!!errors.items?.[index]?.locationCode}
                    helperText={errors.items?.[index]?.locationCode?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].charge`}
                    label="Warehouse"
                    name={`items[${index}].charge`}
                    {...register(`items[${index}].charge`)}
                    error={!!errors.items?.[index]?.charge}
                    helperText={errors.items?.[index]?.charge?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`items[${index}].quantity`}
                    label="Quantity"
                    name={`items[${index}].quantity`}
                    type="number"
                    {...register(`items[${index}].quantity`, {
                      required: "Quantity is required",
                    })}
                    error={!!errors.items?.[index]?.quantity}
                    helperText={errors.items?.[index]?.quantity?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`items[${index}].unit`}
                    label="Unit"
                    name={`items[${index}].unit`}
                    {...register(`items[${index}].unit`, {
                      required: "Unit is required",
                    })}
                    error={!!errors.items?.[index]?.unit}
                    helperText={errors.items?.[index]?.unit?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id={`items[${index}].description`}
                    label="Description"
                    name={`items[${index}].description`}
                    {...register(`items[${index}].description`, {
                      required: "Description is required",
                    })}
                    error={!!errors.items?.[index]?.description}
                    helperText={errors.items?.[index]?.description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id={`items[${index}].unitPrice`}
                    label="Unit Price"
                    name={`items[${index}].unitPrice`}
                    type="number"
                    {...register(`items[${index}].unitPrice`, {
                      required: "Unit Price is required",
                    })}
                    error={!!errors.items?.[index]?.unitPrice}
                    helperText={errors.items?.[index]?.unitPrice?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id={`items[${index}].amount`}
                    label="Amount"
                    name={`items[${index}].amount`}
                    type="number"
                    {...register(`items[${index}].amount`, {
                      required: "Amount is required",
                    })}
                    error={!!errors.items?.[index]?.amount}
                    helperText={errors.items?.[index]?.amount?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`items[${index}].referenceCode`}
                    label="Reference Code"
                    name={`items[${index}].referenceCode`}
                    {...register(`items[${index}].referenceCode`)}
                    error={!!errors.items?.[index]?.referenceCode}
                    helperText={errors.items?.[index]?.referenceCode?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id={`items[${index}].remarks`}
                    label="Remarks"
                    name={`items[${index}].remarks`}
                    multiline
                    rows={2}
                    {...register(`items[${index}].remarks`)}
                    error={!!errors.items?.[index]?.remarks}
                    helperText={errors.items?.[index]?.remarks?.message}
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
                  description: "",
                  quantity: "",
                  unit: "",
                  deliveryDate: "",
                  itemCode: "",
                  locationCode: "",
                  charge: "",
                  unitPrice: "",
                  amount: "",
                  referenceCode: "",
                  remarks: "",
                })
              }
              sx={{ mt: 2 }}
            >
              Add Item
            </Button>
          </Box>

          <Divider sx={{ mt: 4, mb: 4 }} />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <SubmitButton
              isLoading={loading}
              title={isUpdate ? "Update Coil Cut List" : "Create Coil Cut"}
            />
          </div>
        </Box>
      </Box>
    </FormProvider>
  );
}
