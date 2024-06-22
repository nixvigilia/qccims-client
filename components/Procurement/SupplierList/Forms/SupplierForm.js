"use client";

import * as React from "react";
import { useState } from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  createSupplier,
  updateSupplier,
} from "@/lib/api/procurement/supplierApi";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function SupplierForm({ initialData = {}, isUpdate = false }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push("/dashboard/suppliers");
  }

  async function onSubmit(data) {
    if (isUpdate) {
      // Update request
      updateSupplier(
        setLoading,
        `api/procurement/suppliers/${initialData.id}`,
        data,
        "Supplier",
        redirect,
        reset
      );
    } else {
      createSupplier(
        setLoading,
        "api/procurement/suppliers/new",
        data,
        "Supplier",
        reset
      );
    }
  }

  const handleRemove = async (index) => {
    const contact = fields[index];
    if (
      contact.contactName ||
      contact.contactPosition ||
      contact.contactPhone
    ) {
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
        Swal.fire("Removed!", "The contact info has been removed.", "success");
      }
    } else {
      remove(index);
    }
  };

  return (
    <>
      <Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="supplierName"
                label="Supplier Name"
                name="supplierName"
                autoComplete="supplier-name"
                {...register("supplierName", {
                  required: "Supplier Name is required",
                })}
                error={!!errors.supplierName}
                helperText={errors.supplierName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                {...register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
          </Grid>

          <Box mt={4} width="100%">
            <Typography variant="h6">Contact Information</Typography>
            {fields.map((field, index) => (
              <Grid container spacing={2} key={field.id} mt={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`contacts[${index}].contactName`}
                    label="Contact Name"
                    name={`contacts[${index}].contactName`}
                    autoComplete="contact-name"
                    {...register(`contacts[${index}].contactName`, {
                      required: "Contact Name is required",
                    })}
                    error={!!errors.contacts?.[index]?.contactName}
                    helperText={errors.contacts?.[index]?.contactName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`contacts[${index}].contactPosition`}
                    label="Contact Position"
                    name={`contacts[${index}].contactPosition`}
                    autoComplete="contact-position"
                    {...register(`contacts[${index}].contactPosition`)}
                    error={!!errors.contacts?.[index]?.contactPosition}
                    helperText={
                      errors.contacts?.[index]?.contactPosition?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`contacts[${index}].contactPhone`}
                    label="Contact Phone"
                    name={`contacts[${index}].contactPhone`}
                    autoComplete="contact-phone"
                    {...register(`contacts[${index}].contactPhone`, {
                      required: "Contact Phone is required",
                    })}
                    error={!!errors.contacts?.[index]?.contactPhone}
                    helperText={errors.contacts?.[index]?.contactPhone?.message}
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
                append({ contactName: "", contactPosition: "", contactPhone: "" })
              }
              sx={{ mt: 2 }}
            >
              Add Contact Info
            </Button>
          </Box>

          <Divider sx={{ mt: 4, mb: 4 }} />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <SubmitButton
              isLoading={loading}
              title={isUpdate ? "Update Supplier" : "Create Supplier"}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}
