"use client";

import * as React from "react";
import { useState } from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { createCustomer, updateCustomer } from "@/lib/apiRequest";
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

export default function CustomerProfileForm({
  initialData = {},
  isUpdate = false,
}) {
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
    name: "contactInfos",
  });
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push("/dashboard/customers");
  }

  async function onSubmit(data) {
    if (isUpdate) {
      // Update request
      updateCustomer(
        setLoading,
        `api/customer/${initialData.id}`,
        data,
        "Customer",
        redirect,
        reset
      );
    } else {
      createCustomer(setLoading, "api/customer/new", data, "Customer", reset);
    }
  }

  const handleRemove = async (index) => {
    const contact = fields[index];
    if (
      contact.contactPerson ||
      contact.contactPosition ||
      contact.contactTel
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        mt={6}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                autoComplete="company-name"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contact"
                label="Contact"
                name="contact"
                autoComplete="contact"
                {...register("contact")}
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="tinNumber"
                label="TIN Number"
                name="tinNumber"
                autoComplete="tin-number"
                {...register("tinNumber")}
                error={!!errors.tinNumber}
                helperText={errors.tinNumber?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="deliveryRecipient"
                label="Delivery Recipient"
                name="deliveryRecipient"
                autoComplete="delivery-recipient"
                {...register("deliveryRecipient")}
                error={!!errors.deliveryRecipient}
                helperText={errors.deliveryRecipient?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="deliveryAddress"
                label="Delivery Address"
                name="deliveryAddress"
                autoComplete="delivery-address"
                {...register("deliveryAddress")}
                error={!!errors.deliveryAddress}
                helperText={errors.deliveryAddress?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="notes"
                label="Notes"
                name="notes"
                autoComplete="notes"
                multiline
                rows={4}
                {...register("notes")}
                error={!!errors.notes}
                helperText={errors.notes?.message}
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
                    id={`contactInfos[${index}].contactPerson`}
                    label="Contact Person"
                    name={`contactInfos[${index}].contactPerson`}
                    autoComplete="contact-person"
                    {...register(`contactInfos[${index}].contactPerson`, {
                      required: "Contact Person is required",
                    })}
                    error={!!errors.contactInfos?.[index]?.contactPerson}
                    helperText={
                      errors.contactInfos?.[index]?.contactPerson?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`contactInfos[${index}].contactPosition`}
                    label="Contact Position"
                    name={`contactInfos[${index}].contactPosition`}
                    autoComplete="contact-position"
                    {...register(`contactInfos[${index}].contactPosition`, {
                      required: "Contact Position is required",
                    })}
                    error={!!errors.contactInfos?.[index]?.contactPosition}
                    helperText={
                      errors.contactInfos?.[index]?.contactPosition?.message
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id={`contactInfos[${index}].contactTel`}
                    label="Contact Tel"
                    name={`contactInfos[${index}].contactTel`}
                    autoComplete="contact-tel"
                    {...register(`contactInfos[${index}].contactTel`, {
                      required: "Contact Tel is required",
                    })}
                    error={!!errors.contactInfos?.[index]?.contactTel}
                    helperText={
                      errors.contactInfos?.[index]?.contactTel?.message
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
                append({ contactPerson: "", contactPosition: "", contactTel: "" })
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
            <Link href={`/delivery/customer`} passHref>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
            </Link>
            <SubmitButton
              isLoading={loading}
              title={isUpdate ? "Update Customer" : "Create Customer"}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}
