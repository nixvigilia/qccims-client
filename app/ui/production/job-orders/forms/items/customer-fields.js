import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";

const CustomerDetails = ({ jobOrder, customer }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          id="jobOrderId"
          label="Job Order ID"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          defaultValue={jobOrder.jobNumber}
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#36454F",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="customer"
          label="Customer"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          defaultValue={customer.companyName}
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#36454F",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          id="jobDate"
          label="Date Created"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          defaultValue={formatISODateToReadable(jobOrder.jobDate)}
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#36454F",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default CustomerDetails;
