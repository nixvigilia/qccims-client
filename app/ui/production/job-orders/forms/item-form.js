"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, FormProvider} from "react-hook-form";
import {postRequest, updateRequest} from "@/lib/api/requestApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";
import dayjs from "dayjs";

export default function ItemForm({
  initialData = {},
  itemId,
  isUpdate = false,
  mutate,
}) {
  // const router = useRouter();
  const methods = useForm({defaultValues: initialData});
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = methods;
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const filteredData = {
      jobOrderItemId: itemId,
      salesMan: data.salesMan || null,
      poNum: data.poNum || null,
      poQty: data.poQty || null,
      poBal: data.poBal || null,
      joDate: data.joDate ? new Date(data.joDate) : null,
      qty: data.qty || null,
      balance: data.balance || null,
      status: data.status || null,
      deliver: data.deliver || null,
      can: data.can || null,
      unit: data.unit || null,
      printed: data.printed || null,
      litho: data.litho || null,
      box: data.box || null,
      formedDate: data.formedDate ? new Date(data.formedDate) : null,
      formedBegin: data.formedBegin || null,
      formedIn: data.formedIn || null,
      formedOut: data.formedOut || null,
      formedRemarks: data.formedRemarks || null,
      delSat: data.delSat || null,
      delMon: data.delMon || null,
      delTue: data.delTue || null,
      delWed: data.delWed || null,
      delThu: data.delThu || null,
      delFri: data.delFri || null,
      printedDate: data.printedDate ? new Date(data.printedDate) : null,
      customerId: data.customerId || null,
      productId: data.productId || null,
      classId: data.classId || null,
    };

    if (isUpdate) {
      await updateRequest(
        setLoading,
        `api/production/product-specs/${itemId}`,
        filteredData,
        "Job Order",
        reset
      );
    } else {
      await postRequest(
        setLoading,
        `api/production/product-specs`,
        filteredData,
        "Job Order",
        reset
      );
    }

    mutate();
  }

  return (
    <FormProvider {...methods}>
      <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Paper square={false}>
            <Box width="100%" sx={{p: 4}}>
              <Typography variant="h6" pb={2}>
                Product Components
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="salesMan"
                    label="Sales Man"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("salesMan")}
                    error={!!errors.salesMan}
                    helperText={errors.salesMan?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="poNum"
                    label="PO Number"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("poNum")}
                    error={!!errors.poNum}
                    helperText={errors.poNum?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="poQty"
                    label="PO Quantity"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("poQty")}
                    error={!!errors.poQty}
                    helperText={errors.poQty?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="poBal"
                    label="PO Balance"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("poBal")}
                    error={!!errors.poBal}
                    helperText={errors.poBal?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="joDate"
                    label="JO Date"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    type="date"
                    {...register("joDate")}
                    error={!!errors.joDate}
                    helperText={errors.joDate?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="qty"
                    label="Quantity"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("qty")}
                    error={!!errors.qty}
                    helperText={errors.qty?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="balance"
                    label="Balance"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("balance")}
                    error={!!errors.balance}
                    helperText={errors.balance?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="status"
                    label="Status"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("status")}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="deliver"
                    label="Deliver"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("deliver")}
                    error={!!errors.deliver}
                    helperText={errors.deliver?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="can"
                    label="Can"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("can")}
                    error={!!errors.can}
                    helperText={errors.can?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="unit"
                    label="Unit"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("unit")}
                    error={!!errors.unit}
                    helperText={errors.unit?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="printed"
                    label="Printed"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("printed")}
                    error={!!errors.printed}
                    helperText={errors.printed?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="litho"
                    label="Litho"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("litho")}
                    error={!!errors.litho}
                    helperText={errors.litho?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="box"
                    label="Box"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("box")}
                    error={!!errors.box}
                    helperText={errors.box?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="formedDate"
                    label="Formed Date"
                    size="small"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    {...register("formedDate")}
                    error={!!errors.formedDate}
                    helperText={errors.formedDate?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="formedBegin"
                    label="Formed Begin"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("formedBegin")}
                    error={!!errors.formedBegin}
                    helperText={errors.formedBegin?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="formedIn"
                    label="Formed In"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("formedIn")}
                    error={!!errors.formedIn}
                    helperText={errors.formedIn?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="formedOut"
                    label="Formed Out"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("formedOut")}
                    error={!!errors.formedOut}
                    helperText={errors.formedOut?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="formedRemarks"
                    label="Formed Remarks"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("formedRemarks")}
                    error={!!errors.formedRemarks}
                    helperText={errors.formedRemarks?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delSat"
                    label="Delivery Saturday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delSat")}
                    error={!!errors.delSat}
                    helperText={errors.delSat?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delMon"
                    label="Delivery Monday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delMon")}
                    error={!!errors.delMon}
                    helperText={errors.delMon?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delTue"
                    label="Delivery Tuesday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delTue")}
                    error={!!errors.delTue}
                    helperText={errors.delTue?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delWed"
                    label="Delivery Wednesday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delWed")}
                    error={!!errors.delWed}
                    helperText={errors.delWed?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delThu"
                    label="Delivery Thursday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delThu")}
                    error={!!errors.delThu}
                    helperText={errors.delThu?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="delFri"
                    label="Delivery Friday"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("delFri")}
                    error={!!errors.delFri}
                    helperText={errors.delFri?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="printedDate"
                    label="Printed Date"
                    size="small"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    {...register("printedDate")}
                    error={!!errors.printedDate}
                    helperText={errors.printedDate?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="classId"
                    label="Class ID"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{shrink: true}}
                    {...register("classId")}
                    error={!!errors.classId}
                    helperText={errors.classId?.message}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                p: 2,
              }}
            >
              <SubmitButton
                isLoading={loading}
                title={isUpdate ? "Update Specs" : "Create Specs"}
              />
            </Box>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
