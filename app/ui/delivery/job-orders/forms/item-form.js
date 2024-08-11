"use client";

import {useState, useEffect} from "react";
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
import AutoCompleteForm from "./auto-complete-form";
import {useRouter} from "next/navigation";

export default function ItemForm({
  initialData = {},
  itemId,
  isUpdate = false,
  mutate,
}) {
  const router = useRouter();
  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(
    initialData?.products?.[0]?.customer || null
  );
  const [selectedProducts, setSelectedProducts] = useState(
    initialData?.products?.[0] || null
  );

  let formattedProductSpecs;

  if (initialData) {
    formattedProductSpecs = {
      ...initialData,
      supersedeDate: formatDate(initialData.supersedeDate),
    };
  }

  const methods = useForm({defaultValues: formattedProductSpecs || {}});
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = methods;

  useEffect(() => {
    reset(formattedProductSpecs || {});
  }, [reset, itemId]);

  async function onSubmit(data) {
    const filteredData = {
      id: itemId,
      productId: selectedProducts?.id,
      supersedeNumber: data.supersedeNumber || null,
      supersedeDate: data.supersedeDate ? new Date(data.supersedeDate) : null,
      canSize: data.canSize || null,
      body1: data.body1 || null,
      body2: data.body2 || null,
      body3: data.body3 || null,
      body4: data.body4 || null,
      bottom1: data.bottom1 || null,
      bottom2: data.bottom2 || null,
      bottom3: data.bottom3 || null,
      bottom4: data.bottom4 || null,
      cover1: data.cover1 || null,
      cover2: data.cover2 || null,
      cover3: data.cover3 || null,
      cover4: data.cover4 || null,
      topRing1: data.topRing1 || null,
      topRing2: data.topRing2 || null,
      topRing3: data.topRing3 || null,
      topRing4: data.topRing4 || null,
      bodyBlankLength: data.bodyBlankLength || null,
      bodyBlankWidth: data.bodyBlankWidth || null,
      actualCanHeight: data.actualCanHeight || null,
      coverSpout: data.coverSpout || null,
      jointInterlocking: data.jointInterlocking || null,
      handle: data.handle || null,
      handleLocation: data.handleLocation || null,
      handleDistance: data.handleDistance || null,
      solder: data.solder || null,
      beads: data.beads || null,
      numberOfBeads: data.numberOfBeads || null,
      emboss: data.emboss || null,
      embossLocation: data.embossLocation || null,
      specRemarks: data.specRemarks || null,
    };

    if (isUpdate && itemId) {
      const response = await updateRequest(
        setLoading,
        `api/production/product-specs/${itemId}`,
        filteredData,
        "Product Specs",
        reset
      );

      if (response.status === 200) {
        mutate();
      }
    } else {
      const response = await postRequest(
        setLoading,
        "api/production/product-specs/new",
        filteredData,
        "Product Specs",
        reset
      );
      if (response.status === 201) {
        router.push("/production/specification");
        if (mutate) {
          mutate();
        }
      }
    }
  }

  const bodyFields = ["Body 1", "Body 2", "Body 3", "Body 4"];
  const bottomFields = ["Bottom 1", "Bottom 2", "Bottom 3", "Bottom 4"];
  const coverFields = ["Cover 1", "Cover 2", "Cover 3", "Cover 4"];
  const topRingFields = [
    "Top Ring 1",
    "Top Ring 2",
    "Top Ring 3",
    "Top Ring 4",
  ];

  console.log(initialData);

  return (
    <FormProvider {...methods}>
      <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Paper square={false}>
            <Box width="100%" sx={{p: 4}}>
              <Typography variant="h6" pb={2}>
                Product Specs
              </Typography>

              <Grid container spacing={3}>
                {itemId ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Can Size"
                        size="small"
                        variant="filled"
                        defaultValue={
                          initialData.products[0]?.customer?.companyName
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Can Size"
                        size="small"
                        variant="filled"
                        defaultValue={initialData.products[0]?.productName}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <AutoCompleteForm
                        selectedDetails={selectedCustomer}
                        setSelectedDetails={setSelectedCustomer}
                        columnName="companyName"
                        title="Customer Name"
                        endpoint="/api/customer/list"
                        category="tin"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <AutoCompleteForm
                        selectedDetails={selectedProducts}
                        setSelectedDetails={setSelectedProducts}
                        customerId={selectedCustomer?.id}
                        columnName="productName"
                        title="Product Name"
                        endpoint="/api/quality/products/list"
                        category="tin"
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="supersedeNumber"
                    label="Supersede Number"
                    size="small"
                    InputLabelProps={{shrink: true}}
                    {...register("supersedeNumber")}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    id="supersedeDate"
                    label="Supersede Date"
                    size="small"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    {...register("supersedeDate")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="canSize"
                    label="Can Size"
                    size="small"
                    InputLabelProps={{shrink: true}}
                    {...register("canSize")}
                    error={!!errors.canSize}
                    helperText={errors.canSize?.message}
                  />
                </Grid>

                {bodyFields.map((label, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <TextField
                      fullWidth
                      id={`body${index + 1}`}
                      label={label}
                      size="small"
                      InputLabelProps={{shrink: true}}
                      {...register(`body${index + 1}`)}
                      error={!!errors[`body${index + 1}`]}
                      helperText={errors[`body${index + 1}`]?.message}
                    />
                  </Grid>
                ))}

                {bottomFields.map((label, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <TextField
                      fullWidth
                      id={`bottom${index + 1}`}
                      label={label}
                      size="small"
                      InputLabelProps={{shrink: true}}
                      {...register(`bottom${index + 1}`)}
                      error={!!errors[`bottom${index + 1}`]}
                      helperText={errors[`bottom${index + 1}`]?.message}
                    />
                  </Grid>
                ))}

                {coverFields.map((label, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <TextField
                      fullWidth
                      id={`cover${index + 1}`}
                      label={label}
                      size="small"
                      InputLabelProps={{shrink: true}}
                      {...register(`cover${index + 1}`)}
                      error={!!errors[`cover${index + 1}`]}
                      helperText={errors[`cover${index + 1}`]?.message}
                    />
                  </Grid>
                ))}

                {topRingFields.map((label, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <TextField
                      fullWidth
                      id={`topRing${index + 1}`}
                      label={label}
                      size="small"
                      InputLabelProps={{shrink: true}}
                      {...register(`topRing${index + 1}`)}
                      error={!!errors[`topRing${index + 1}`]}
                      helperText={errors[`topRing${index + 1}`]?.message}
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="bodyBlankLength"
                    label="Body Blank Length"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("bodyBlankLength")}
                    error={!!errors.bodyBlankLength}
                    helperText={errors.bodyBlankLength?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="bodyBlankWidth"
                    label="Body Blank Width"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("bodyBlankWidth")}
                    error={!!errors.bodyBlankWidth}
                    helperText={errors.bodyBlankWidth?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="actualCanHeight"
                    label="Actual Can Height"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("actualCanHeight")}
                    error={!!errors.actualCanHeight}
                    helperText={errors.actualCanHeight?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="coverSpout"
                    label="Cover/Spout"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("coverSpout")}
                    error={!!errors.coverSpout}
                    helperText={errors.coverSpout?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="jointInterlocking"
                    label="Joint Interlocking"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("jointInterlocking")}
                    error={!!errors.jointInterlocking}
                    helperText={errors.jointInterlocking?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="handle"
                    label="Handle"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("handle")}
                    error={!!errors.handle}
                    helperText={errors.handle?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="handleLocation"
                    label="Handle Location"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("handleLocation")}
                    error={!!errors.handleLocation}
                    helperText={errors.handleLocation?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="handleDistance"
                    label="Handle Distance"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("handleDistance")}
                    error={!!errors.handleDistance}
                    helperText={errors.handleDistance?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="solder"
                    label="Solder"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("solder")}
                    error={!!errors.solder}
                    helperText={errors.solder?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="beads"
                    label="Beads"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("beads")}
                    error={!!errors.beads}
                    helperText={errors.beads?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="numberOfBeads"
                    label="Number of Beads"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("numberOfBeads")}
                    error={!!errors.numberOfBeads}
                    helperText={errors.numberOfBeads?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="emboss"
                    label="Emboss"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("emboss")}
                    error={!!errors.emboss}
                    helperText={errors.emboss?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="embossLocation"
                    label="Emboss Location"
                    size="small"
                    variant="filled"
                    InputLabelProps={{shrink: true}}
                    {...register("embossLocation")}
                    error={!!errors.embossLocation}
                    helperText={errors.embossLocation?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="specRemarks"
                    label="Remarks"
                    size="small"
                    InputLabelProps={{shrink: true}}
                    multiline
                    rows={4}
                    {...register("specRemarks")}
                    error={!!errors.specRemarks}
                    helperText={errors.specRemarks?.message}
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
