import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm, useFieldArray, FormProvider} from "react-hook-form";
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
import {createJobOrder, updateJobOrder} from "@/lib/api/delivery/jobOrderApi";
import AutoCompleteForm from "./auto-complete-form";

export default function MainForm({initialData = {}, mutate, isUpdate = false}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [unit, setUnit] = useState([]);
  const [errors, setErrors] = useState({}); // State for tracking validation errors

  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");
  const today = dayjs().format("YYYY-MM-DD");

  const formattedInitialData = {
    ...initialData,
    jobDate: today,
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
    formState: {errors: formErrors},
  } = useForm({defaultValues: formattedInitialData});

  const {fields, append, remove} = useFieldArray({
    control,
    name: "jobOrderItems",
  });

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
      setUnit(
        initialData.jobOrderItems.map((item) => ({
          id: item.unit.id,
          name: item.unit.abbreviation,
        }))
      );
    }
  }, [initialData, isUpdate]);

  function redirect() {
    router.push("/production/printing");
  }

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!selectedCustomer) {
      newErrors.customer = "Customer is required";
    }

    fields.forEach((field, index) => {
      if (!selectedProducts[index] || !selectedProducts[index].id) {
        newErrors[`product-${index}`] = "Product is required";
      }
      if (!unit[index] || !unit[index].id) {
        newErrors[`unit-${index}`] = "Unit is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(data) {
    if (!validateForm()) {
      return;
    }

    data.customerId = selectedCustomer?.id || null;
    data.jobOrderItems = data.jobOrderItems.map((item, index) => ({
      ...item,
      productId: selectedProducts[index]?.id || item.productId,
      unitId: unit[index]?.id || item.unitId,
    }));

    const itemsToUpdate = data.jobOrderItems.filter((item) => item.id);
    const itemsToCreate = data.jobOrderItems.filter((item) => !item.id);

    const updatePayload = {
      ...data,
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
        router.push("/production/printing");
      }
    }
  }

  const handleRemove = async (index) => {
    const item = fields[index];
    if (item.quantity || item.unitId) {
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
                      selectedDetails={selectedCustomer}
                      setSelectedDetails={setSelectedCustomer}
                      columnName="companyName"
                      title="Customer Name"
                      endpoint="/api/customer/list"
                    />
                    {errors.customer && (
                      <Typography color="error">{errors.customer}</Typography>
                    )}
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
                    value={today} // Set to today's date
                    disabled // Disable the input field
                    {...register("jobDate", {
                      required: "Job Date is required",
                    })}
                    error={!!formErrors.jobDate}
                    helperText={formErrors.jobDate?.message}
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
                    error={!!formErrors.remarks}
                    helperText={formErrors.remarks?.message}
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
                        selectedDetails={selectedProducts[index]}
                        setSelectedDetails={(newValue) => {
                          const updatedProducts = [...selectedProducts];
                          updatedProducts[index] = newValue;
                          setSelectedProducts(updatedProducts);
                        }}
                        customerId={selectedCustomer?.id}
                        columnName="productName"
                        variant="outlined"
                        title="Product Name"
                        endpoint="/api/quality/products/list"
                        size="small"
                      />
                      {errors[`product-${index}`] && (
                        <Typography color="error">
                          {errors[`product-${index}`]}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].salesOrder`}
                        label="PO Number"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        name={`jobOrderItems[${index}].salesOrder`}
                        {...register(`jobOrderItems[${index}].salesOrder`)}
                        error={!!formErrors.jobOrderItems?.[index]?.salesOrder}
                        helperText={
                          formErrors.jobOrderItems?.[index]?.salesOrder?.message
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
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].deliveryDate`)}
                        error={
                          !!formErrors.jobOrderItems?.[index]?.deliveryDate
                        }
                        helperText={
                          formErrors.jobOrderItems?.[index]?.deliveryDate
                            ?.message
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
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].quantity`, {
                          required: "Quantity is required",
                        })}
                        error={!!formErrors.jobOrderItems?.[index]?.quantity}
                        helperText={
                          formErrors.jobOrderItems?.[index]?.quantity?.message
                        }
                      />
                      {errors[`quantity-${index}`] && (
                        <Typography color="error">
                          {errors[`quantity-${index}`]}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <AutoCompleteForm
                        selectedDetails={unit[index]}
                        setSelectedDetails={(newValue) => {
                          const updatedUnit = [...unit];
                          updatedUnit[index] = newValue;
                          setUnit(updatedUnit);
                        }}
                        columnName="abbreviation"
                        variant="outlined"
                        title="Unit"
                        endpoint="/api/units/list"
                        size="small"
                      />
                      {errors[`unit-${index}`] && (
                        <Typography color="error">
                          {errors[`unit-${index}`]}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id={`jobOrderItems[${index}].remarks`}
                        label="Remarks"
                        name={`jobOrderItems[${index}].remarks`}
                        size="small"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        {...register(`jobOrderItems[${index}].remarks`)}
                        error={!!formErrors.jobOrderItems?.[index]?.remarks}
                        helperText={
                          formErrors.jobOrderItems?.[index]?.remarks?.message
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
                      salesOrder: "",
                      deliveryDate: "",
                      quantity: "",
                      unit: "",
                      remarks: "",
                      productId: "",
                    })
                  }
                  sx={{mt: 2}}
                >
                  Add Item
                </Button>
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
                title={isUpdate ? "Update Job Order" : "Create Job Order"}
              />
            </div>
          </Paper>
        </Grid>
      </Box>
    </FormProvider>
  );
}
