import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormContext} from "react-hook-form";

const RemarksField = ({}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="remarks"
          label="Remarks"
          size="small"
          InputLabelProps={{shrink: true}}
          multiline
          rows={4}
          {...register("remarks")}
          error={!!errors.remarks}
          helperText={errors.remarks?.message}
        />
      </Grid>
    </>
  );
};

export default RemarksField;
